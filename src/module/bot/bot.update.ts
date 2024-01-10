import { Injectable } from '@nestjs/common';
import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { Markup } from 'telegraf';
import { UserService } from '../user/user.service';
import { Context } from 'vm';

function actionButtons() {
  return Markup.keyboard([
    Markup.button.callback('Горячие матчи', 'games'),
    Markup.button.callback('Настройки', 'settings'),
    Markup.button.callback('Мой профиль', 'profile'),
  ]).resize(true);
}

function profileButtons() {
  return Markup.keyboard([
    Markup.button.callback('Создать профиль', 'create profile'),
    Markup.button.contactRequest('Поделиться номером'),
  ]).resize(true);
}

function betButtons() {
  return Markup.inlineKeyboard([
    Markup.button.callback('Поставить ставку', 'bet'),
  ]);
}

function choiseMatchButtons() {
  return Markup.keyboard(
    [
      Markup.button.callback('1', '1'),
      Markup.button.callback('2', '2'),
      Markup.button.callback('3', '3'),
      Markup.button.callback('4', '4'),
      Markup.button.callback('5', '5'),
      Markup.button.callback('6', '6'),
    ],
    {
      columns: 2,
    },
  ).oneTime(true);
}

@Injectable()
@Update()
export class BotUpdate {
  constructor(
    private botService: BotService,
    private userService: UserService,
  ) {}

  @Start()
  async onStart(ctx: Context) {
    // console.log(ctx.from);
    let user = await this.userService.getUser(ctx.from.id);
    console.log(user);

    if (!user) {
      user = await this.userService.createUser({
        uid: ctx.from.id,
        name: ctx.from.first_name,
      });
    }
    await ctx.reply(`Здравствуйте ${user.name}`);
    await ctx.reply('Разделы', actionButtons());
  }

  @On('contact')
  async addContact(@Ctx() ctx: Context) {
    const phone: string = ctx.message.contact.phone_number;
    const id: string = ctx.from.id;
    await this.userService.updatePhoneNumber({ id: id, phone: phone });
  }

  @On('callback_query')
  async getCallbacks(@Ctx() ctx: Context) {
    const obj = JSON.parse(ctx.update.callback_query.data);
    const payload = obj.p;
    const command = obj.c;

    // console.log('ctx ', payload);
    try {
      if (command === '/addToBetItem') {
        await this.userService.addMatchId(ctx.from.id, payload);
      }
    } catch (error) {
      console.log('error addMatchId');
    }
  }

  @Action('bet')
  async getBet(ctx: Context) {
    await ctx.reply(`Выберите матч`, choiseMatchButtons());
  }

  @Hears('Горячие матчи')
  async showGames(@Ctx() ctx) {
    await this.botService.showGames(ctx);
  }

  @Command('info')
  async getInfo(ctx: Context) {
    await ctx.reply(`Your name is ${ctx.from.first_name}`);
  }

  @Hears(/привет/)
  message(): string {
    return 'Привет, как дела?';
  }

  @Hears('Настройки')
  async settings(ctx: Context) {
    ctx.reply('Settings');
  }

  @Hears('Мой профиль')
  async userProfile(ctx: Context) {
    await ctx.reply(
      'this is your profile, you can change him',
      profileButtons(),
    );
  }
}

// @Hears(['1', '2', '3', '4', '5', '6'])
// async choiseMatch(ctx: Context) {
//     const matchId = Number(ctx.message.text) - 1;
//     async function coefButtons() {
//         return Markup.inlineKeyboard([
//             Markup.button.callback(`P1: ${games[matchId].coef1}`, 'P1'),
//             Markup.button.callback(`X: ${games[matchId].coefX} `, 'X'),
//             Markup.button.callback(`P2: ${games[matchId].coef2}`, 'P2'),
//         ]
//         )
//     }
//     const text = await this.botService.choiseGame(matchId);
//     await ctx.reply(text, coefButtons());
// }
