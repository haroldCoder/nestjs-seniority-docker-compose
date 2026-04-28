import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { RecipeNotFoundException } from '../../application/exceptions/recipe-not-found.exception';

@Catch()
export class RecipesExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception instanceof RecipeNotFoundException) {
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: exception.message,
      });
    }

    // Default error handling (already covered by global filter if configured, 
    // but here for completeness within the module's presentation logic)
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: exception.message,
    });
  }
}
