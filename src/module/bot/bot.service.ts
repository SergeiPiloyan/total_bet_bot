import { Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { Markup } from "telegraf";
import { Context } from "vm";


type TGame = {
    id: number,
    sport: string,
    lige: string,
    names: string,
    coef1: number,
    coef2: number,
    coefX: number,
}

export const games: TGame[] = [
    { id: 1, sport: 'football', lige: 'SPAIN: La Liga', names: 'Real Madrid - Barcelona', coef1: 1.8, coef2: 2, coefX: 3, },
    { id: 2, sport: 'football', lige: 'ENGLAND: Premier League', names: 'Manchester City - Manchester United', coef1: 1.45, coef2: 2.32, coefX: 4.2, },
    { id: 3, sport: 'football', lige: 'FRANCE: Ligue 1', names: 'Marseille - Brest', coef1: 2.5, coef2: 1.2, coefX: 6.7, },
    { id: 4, sport: 'football', lige: 'ENGLAND: Premier League', names: 'Chelsea - Arsenal', coef1: 3.4, coef2: 1.2, coefX: 3.1, },
    { id: 5, sport: 'football', lige: 'WORLD: Champions League', names: 'PSG - Barcelona', coef1: 2.3, coef2: 1.45, coefX: 5.45, },
    { id: 6, sport: 'football', lige: 'ARMENIA: Premier League', names: 'Ararat - Urartu', coef1: 1.8, coef2: 2.5, coefX: 3.23, },
]




@Injectable()
export class BotService {
    constructor(
        private userService: UserService
    ) { }

    async getUser(telegramId: number) {
        return this.userService.getUser(String(telegramId))
    }

    async showGames(ctx: Context) {
        const coefButtons = (game: TGame) => {
            return Markup.inlineKeyboard(
                [
                    {
                        text: `P1: ${game.coef1}`,
                        callback_data: JSON.stringify({
                            command: '/addToBetItem',
                            payload: {
                                matchId: game.id,
                                coef: game.coef1,
                                type: 'P1',
                            },
                        }),
                    },
                    {
                        text: `X: ${game.coefX}`,
                        callback_data: JSON.stringify({
                            command: '/addToBetItem',
                            payload: {
                                matchId: game.id,
                                coef: game.coefX,
                                type: 'X',
                            },
                        }),
                    },
                    {
                        text: `P2: ${game.coef2}`,
                        callback_data: JSON.stringify({
                            command: '/addToBetItem',
                            payload: {
                                matchId: game.id,
                                coef: game.coef2,
                                type: 'P2',
                            },
                        }),
                    },
                ],
            )
        }
        return await games.map((g) => ctx.reply(`${g.id}. ${g.names} \n\n`, coefButtons(g)))
    }

    async choiseGame(gameId): Promise<string> {
        if (typeof gameId === 'number') {
            return await `${games[gameId].id}. ${games[gameId].names} \n\n Страна и турнир: ${games[gameId].lige} `
        }
        return await 'Укажите корректный номер матча'
    }


}


// type TExtMatch = TMatch & {
//     Ext: TMatch[]
// }

// type TMatch = {
//     Id: number;
//     Name: string;
//     Start: number;
//     Score: string;
//     Uniq: string | null;
// }

// async getMatches(): Promise<TExtMatch[]> {
    //     const response = await fetch("https://betapi.net/documentation/data/rez_game.json");
    //     const matches = await response.json();
    //     return matches.body;
    // }

