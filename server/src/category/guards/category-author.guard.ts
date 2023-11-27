import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CategoryService } from "../category.service";
import { Category } from "../entities/category.entity";

@Injectable()
export class CategoryAuthorGuard implements CanActivate {
    constructor(private readonly categoryService: CategoryService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const user = request.user
        const { id } = request.params
        
        const category: Category = await this.categoryService.findOne(id)
        
        if (category && user && category.user.id === user.id) {
            return true
        }

        return false
    }
}