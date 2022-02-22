import Enmap from "enmap";
import { DateTime } from "luxon";
import { client } from "..";

export interface ILeaderboard {
  id: string;
  name: string;
  coins: number;
}

export class Leaderboard {
  private date = DateTime.now();

  get dailyLeaderboardID() {
    return `${this.date.daysInYear}-${this.date.year}`;
  }

  get monthlyLeaderboardID() {
    return `${this.date.month}-${this.date.year}`;
  }

  get allTimeLeaderboardID() {
    return `all-time`;
  }


  private _update(
    userID: string, 
    name: string, 
    amount: number, 
    type: "daily" | "monthly" | "all-time",
  ) {
    let db!: Enmap<string, ILeaderboard[]>;
    let id = "";

    switch (type) {
      case "daily": 
        id = this.dailyLeaderboardID;
        db = client.daily;
        break;
      case "monthly":
        id = this.monthlyLeaderboardID;
        db = client.monthly;
        break;
      case "all-time":
        id = this.allTimeLeaderboardID;
        db = client.allTime;
    }

    const leaderboard = db.get(id) || [];
    const user = leaderboard.find(x => x.id === userID);

    if (user) {
      user.coins += amount;
    } else {
      leaderboard.push({ id: userID, coins: amount, name: name });
    }

    db.set(id, leaderboard);
  }

  update(userID: string, name: string, amount: number) {

    if (amount > 0) {
      this._update(userID, name, amount, "daily");
      this._update(userID, name, amount, "monthly");
      this._update(userID, name, amount, "all-time");
    }
  }
}
