import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { TransactionService } from "../transaction.service";
import { Observable } from "rxjs";
import { Transaction } from "../entities/transaction.entity";

@Injectable()
export class TransactionAuthorGuard implements CanActivate {
    constructor(private readonly transactionService: TransactionService) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const user = request.user
        const { id } = request.params
        
        const transaction: Transaction = await this.transactionService.findOne(id)

        if (transaction && user && transaction.user.id === user.id) {
            return true
        }

        return false    
    }
}
