import { ParsedCommand } from '../types/protocol';

interface CommandPattern {
  patterns: RegExp[];
  parse: (matches: RegExpMatchArray) => ParsedCommand;
}

export class CommandParser {
  private patterns: CommandPattern[] = [
    // Pipeline patterns
    {
      patterns: [
        /show (?:all )?pipelines(?: for)? ([\w-]+)/i,
        /list (?:all )?pipelines(?: for)? ([\w-]+)/i,
        /get (?:all )?pipelines(?: for)? ([\w-]+)/i,
      ],
      parse: (matches) => ({
        action: 'list-pipelines',
        args: { application: matches[1] }
      })
    },
    {
      patterns: [
        /(?:show|get) pipeline ([\w-]+) (?:for|in) ([\w-]+)/i,
        /(?:show|get) ([\w-]+) pipeline (?:for|in) ([\w-]+)/i
      ],
      parse: (matches) => ({
        action: 'get-pipeline',
        args: { pipelineId: matches[1], application: matches[2] }
      })
    },
    {
      patterns: [
        /(?:execute|run|start) pipeline ([\w-]+)(?: for| in)? ([\w-]+)(?: with (.+))?/i
      ],
      parse: (matches) => ({
        action: 'execute',
        args: {
          pipelineId: matches[1],
          application: matches[2],
          params: matches[3] ? JSON.parse(matches[3]) : undefined
        }
      })
    },
    {
      patterns: [
        /(?:cancel|stop) (?:pipeline )?(?:execution )?([\w-]+)/i,
        /kill (?:pipeline )?(?:execution )?([\w-]+)/i
      ],
      parse: (matches) => ({
        action: 'cancel',
        args: { executionId: matches[1] }
      })
    },
    {
      patterns: [
        /pause (?:pipeline )?(?:execution )?([\w-]+)/i,
        /halt (?:pipeline )?(?:execution )?([\w-]+)/i
      ],
      parse: (matches) => ({
        action: 'pause',
        args: { executionId: matches[1] }
      })
    },
    {
      patterns: [
        /(?:show|get|check) status(?: of)? ([\w-]+)/i,
        /watch (?:pipeline )?(?:execution )?([\w-]+)/i,
        /monitor (?:pipeline )?(?:execution )?([\w-]+)/i
      ],
      parse: (matches) => ({
        action: 'watch',
        args: { executionId: matches[1] }
      })
    },
    {
      patterns: [
        /debug (?:pipeline )?(?:execution )?([\w-]+)/i,
        /(?:show|get|check) details(?: for)? ([\w-]+)/i,
        /(?:troubleshoot|diagnose) (?:pipeline )?(?:execution )?([\w-]+)/i
      ],
      parse: (matches) => ({
        action: 'debug',
        args: { executionId: matches[1] }
      })
    },

    // Deploy history patterns
    {
      patterns: [
        /(?:show|get|list) (?:all )?deploys(?: for)? ([\w-]+)(?: in)? ([\w-]+)?/i,
        /deployment history(?: for)? ([\w-]+)(?: in)? ([\w-]+)?/i
      ],
      parse: (matches) => ({
        action: 'list-deploys',
        args: {
          application: matches[1],
          environment: matches[2]
        }
      })
    },
    {
      patterns: [
        /(?:show|get) last deploy(?: for)? ([\w-]+)(?: in)? ([\w-]+)/i,
        /what(?:'s| is| was) the last deploy(?: for)? ([\w-]+)(?: in)? ([\w-]+)/i
      ],
      parse: (matches) => ({
        action: 'last-deploy',
        args: {
          application: matches[1],
          environment: matches[2]
        }
      })
    },

    // Snapshot patterns
    {
      patterns: [
        /(?:show|get|list) (?:all )?snapshots(?: for)? ([\w-]+)/i
      ],
      parse: (matches) => ({
        action: 'list-snapshots',
        args: { application: matches[1] }
      })
    },
    {
      patterns: [
        /(?:show|get) snapshot(?: for)? ([\w-]+) (?:with )?([\w-]+) ([\w-]+)/i,
        /find snapshot(?: for)? ([\w-]+) (?:with )?([\w-]+) ([\w-]+)/i
      ],
      parse: (matches) => ({
        action: 'get-snapshot',
        args: {
          application: matches[1],
          sha: matches[2],
          branch: matches[3]
        }
      })
    },
    {
      patterns: [
        /deploy snapshot ([\w-]+)(?: to)? ([\w-]+)(?: using)? ([\w-]+)/i,
        /use snapshot ([\w-]+)(?: to)? deploy(?: to)? ([\w-]+)(?: using)? ([\w-]+)/i
      ],
      parse: (matches) => ({
        action: 'deploy-snapshot',
        args: {
          snapshotId: matches[1],
          application: matches[2],
          pipelineId: matches[3]
        }
      })
    }
  ];

  parseCommand(input: string): ParsedCommand | null {
    for (const { patterns, parse } of this.patterns) {
      for (const pattern of patterns) {
        const matches = input.match(pattern);
        if (matches) {
          return parse(matches);
        }
      }
    }

    throw new Error(`Could not parse command: ${input}`);
  }

  // Utility method to suggest similar commands
  suggestCommand(input: string): string[] {
    const suggestions: string[] = [];
    const words = input.toLowerCase().split(' ');

    // Add suggestions based on key action words
    if (words.some(w => ['show', 'get', 'list'].includes(w))) {
      suggestions.push(
        'show pipelines for [application]',
        'show pipeline [id] for [application]',
        'show snapshots for [application]',
        'list deploys for [application] in [environment]'
      );
    }

    if (words.some(w => ['run', 'execute', 'start'].includes(w))) {
      suggestions.push(
        'run pipeline [id] for [application]',
        'execute pipeline [id] in [application] with {"param": "value"}'
      );
    }

    if (words.some(w => ['deploy', 'snapshot'].includes(w))) {
      suggestions.push(
        'deploy snapshot [id] to [application] using [pipeline]',
        'get snapshot for [application] with [sha] [branch]'
      );
    }

    return suggestions;
  }
}