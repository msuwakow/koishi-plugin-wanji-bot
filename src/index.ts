import { Context, Schema } from 'koishi'

export const name = 'wanji-bot'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

let number_of_players: number = 0

function react (session, pl: number) {
  let res: string;
  if (pl > 6) {
    res = '大比队，快跑';
  }
  if (pl > 0 && pl <= 2) {
    res = '我去，谁在吧唧！';
  }
  if (pl === 0) {
    res = '没人玩舞萌';
  }
  return res;
}

export function apply(ctx: Context) {
  // write your plugin here
  ctx.on ('message', (session) => {
    const regex = /^万(\d+)$/;
    const match = session.content.match(regex);
    if (match) {
      const numberString = match[1];
      const number = parseInt (numberString, 10);
      // session.send (`Debug: ${session.content}, ${numberString}, ${number}`)
      if (number > 16) {
        session.send ('别搞笑了，万柳哪有这么多人');
      }
      else {
        number_of_players = number;
        session.send (`收到，万${number}\n${react (session, number)}`);
        // react (session, number);
      }
    }

    if (session.content === '万几') {
      // session.send (`Debug: ${session.content}, ${session.content === '万几'}`)
      session.send (`万${number_of_players}\n${react (session, number_of_players)}`);
      // react (session, number_of_players);
    }
  })
}
