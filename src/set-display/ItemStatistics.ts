import { IItem } from './IItem';
import { IListing } from './IListing';

export class ItemStatistics {
  public id: number;

  public name: string;

  public listings: IListing[];

  public avgTop3: number = 0;

  public avgTop10: number = 0;

  public avgTop25: number = 0;

  public avgTop50: number = 0;

  public avgTop100: number = 0;

  constructor(item: IItem, listings: IListing[]) {
    this.id = item.id;
    this.name = item.name;
    this.listings = listings;

    this.calcAvgs();
  }

  private calcAvgs() {
    let total = 0;

    for (let i = 0; i < 99; i++) {
      total += this.listings[i].cost;

      if (i === 2) {
        this.avgTop3 = total / 3;
      }

      if (i === 9) {
        this.avgTop10 = total / 10;
      }

      if (i === 24) {
        this.avgTop10 = total / 25;
      }

      if (i === 49) {
        this.avgTop10 = total / 50;
      }

      if (i === 99) {
        this.avgTop10 = total / 100;
      }
    }
  }
}
