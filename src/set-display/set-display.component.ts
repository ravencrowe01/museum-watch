import { Component, OnInit } from '@angular/core';
import { IListing } from './IListing';
import { IItem } from './IItem';
import { ItemStatistics } from './ItemStatistics';
import { NgFor } from '@angular/common';

@Component({
  selector: 'set-display',
  standalone: true,
  imports: [
    NgFor
  ],
  templateUrl: './set-display.component.html',
  styleUrl: './set-display.component.css'
})
export class SetDisplayComponent implements OnInit {
  baseUrl: string = "https://api.torn.com/torn/";
  apiVersion: string = "";
  apiKey: string = "6zMgrQ1P77tb0ngB";

  public plushies: IItem [] = [
    {
      id: 186,
      name: "Sheep Plushie"
    },
    {
      id: 187,
      name: "Teddy Bear Plushie"
    },
    {
      id: 215,
      name: "Kitten Plushie"
    },
    {
      id: 258,
      name: "Jaguar Plushie"
    },
    {
      id: 261,
      name: "Wolverine Plushie"
    },
    {
      id: 266,
      name: "Nessie Plushie"
    },
    {
      id: 268,
      name: "Red Fox Plushie"
    },
    {
      id: 269,
      name: "Monkey Plushie"
    },
    {
      id: 273,
      name: "Chamois Plushie"
    },
    {
      id: 274,
      name: "Panda Plushie"
    },
    {
      id: 281,
      name: "Lion Plushie"
    },
    {
      id: 384,
      name: "Camel Plushie"
    },
    {
      id: 618,
      name: "Stingray Plushie"
    }
  ]

  public plushieStatistics: ItemStatistics [] = [];

  public flowers: IItem [] = [
    {
      "id": 260,
      "name": "Dahlia"
    },
    {
      "id": 263,
      "name": "Crocus"
    },
    {
      "id": 264,
      "name": "Orchid"
    },
    {
      "id": 267,
      "name": "Heather"
    },
    {
      "id": 271,
      "name": "Ceibo Flower"
    },
    {
      "id": 272,
      "name": "Edelweiss"
    },
    {
      "id": 276,
      "name": "Peony"
    },
    {
      "id": 277,
      "name": "Cherry Blossom"
    },
    {
      "id": 282,
      "name": "African Violet"
    },
    {
      "id": 385,
      "name": "Tribulus Omanense"
    },
    {
      "id": 617,
      "name": "Banana Orchid"
    }
  ];

  public flowerStatistics: ItemStatistics [] = [];

  ngOnInit(): void {
    this.plushies.forEach(async plushie => {
      let stats = await this.buildItemStatistics (plushie);

      this.plushieStatistics.push (stats)
    });

    this.flowers.forEach(async flower => {
      let stats = await this.buildItemStatistics (flower);

      this.flowerStatistics.push (stats)
    });
  }

  async buildItemStatistics (item: IItem): Promise<ItemStatistics> {
    let listings = await this.fetchItemListings (item.id);

    return new ItemStatistics (item, listings);
  }

  async fetchItemListings (id: number): Promise<IListing []> {
    let listings: IListing [] = [];

    let response = await fetch (this.buildFetchUrl (id));

    listings.push (await response.json());
    
    return listings;
  }

  buildFetchUrl (id: number): string {
    return `${this.baseUrl}${this.apiVersion}market/${id}?key=${this.apiKey}&selections=bazaar`;
  }
}
