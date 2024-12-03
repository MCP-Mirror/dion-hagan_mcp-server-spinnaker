import { Request, Response } from 'express';
import { ModelContextProtocolServer } from '../handlers/ModelContextProtocolServer';
import { mockGateClient, mockPipelineExecution } from './helpers';

describe('ModelContextProtocolServer', () => {
  let server: ModelContextProtocolServer;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let jsonSpy: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    
    jsonSpy = jest.fn();
    mockRes = {
      json: jsonSpy,
      status: jest.fn().mockReturnThis()
    };

    server = new ModelContextProtocolServer(
      'http://gate:8084',
      ['test-app'],
      ['prod', 'staging']
    );
  });

  describe('context endpoints', () => {
    test('handleGetContext returns current context with refresh interval', async () => {
      await server.initialize();
      
      await server.handleGetContext(
        mockReq as Request,
        mockRes as Response
      );

      expect(jsonSpy).toHaveBeenCalledWith(expect.objectContaining({
        context: expect.any(Object),
        refresh_in_seconds: expect.any(Number)
      }));
    });

    test('handleSetContext acknowledges updates', async () => {
      mockReq = {
        body: {
          context: {
            someKey: 'someValue'
          }
        }
      };

      await server.handleSetContext(
        mockReq as Request,
        mockRes as Response
      );

      expect(jsonSpy).toHaveBeenCalledWith({
        status: 'success'
      });
    });
  });

  describe('command handling', () => {
    test('handleCommand processes commands and returns results', async () => {
      mockReq = {
        body: {
          command: 'get-pipeline-execution',
          args: { executionId: 'exec-1' }
        }
      };

      mockGateClient.getPipelineExecutionDetails.mockResolvedValue(mockPipelineExecution);

      await server.handleCommand(
        mockReq as Request,
        mockRes as Response
      );

      expect(jsonSpy).toHaveBeenCalledWith(expect.objectContaining({
        result: expect.objectContaining({
          execution: expect.any(Object)
        })
      }));
    });

    test('handleCommand returns errors for invalid commands', async () => {
      mockReq = {
        body: {
          command: 'invalid-command',
          args: {}
        }
      };

      await server.handleCommand(
        mockReq as Request,
        mockRes as Response
      );

      expect(jsonSpy).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.any(String)
      }));
    });
  });

  describe('initialization', () => {
    test('initialize sets up context manager', async () => {
      await server.initialize();
      
      await server.handleGetContext(
        mockReq as Request,
        mockRes as Response
      );

      const response = jsonSpy.mock.calls[0][0];
      expect(response.context.lastRefresh).toBeTruthy();
    });
  });
});