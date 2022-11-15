import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";

export class SerializeInterceptor implements NestInterceptor{
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    //Run something before a request is handled
    //by the request handler
    console.log('Running Before Handler', context);
    
    return next.handle().pipe(
      map((data: any) => {
        //Run something before returning response
        console.log('Running before response is sent back', data);
      })
    );
  }
}