import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO } from "./user.dto";


@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }


    @Post()
    async createUser(@Body() createUserDTO: CreateUserDTO) {
        const newUser = await this.userService.createUser(createUserDTO)
        console.log(JSON.stringify(newUser));
    }

    @Get(':telegramId')
    async getUser(@Param('telegramId') telegramId: number) {
        const findUser = await this.userService.getUser(String(telegramId));
        console.log(findUser);
    }
}