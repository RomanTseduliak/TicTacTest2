import { Component } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "tic-tak-toe";
  player1 = "mister [☉﹏☉]";
  player2 = "missis (＾◡＾)";
  winMessage: string = "";
  isCross: boolean = false;
  itemArray: string[] = new Array(9).fill("");
  lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  constructor(private toastr: ToastrService) {}

  handleClick(itemNum: number) {
    if (this.winMessage) {
      return this.toastr.success(this.winMessage);
    }

    if (!this.itemArray[itemNum]) {
      this.itemArray[itemNum] = this.isCross ? this.player1 : this.player2;
      this.isCross = !this.isCross;
    } else return this.toastr.info("Already Filled");

    this.checkIsWinner();
  }

  checkIsWinner() {
    for (let i = 0; i < this.lines.length; i++) {
      const [a, b, c] = this.lines[i];
      if (
        this.itemArray[a] &&
        this.itemArray[a] === this.itemArray[b] &&
        this.itemArray[a] === this.itemArray[c]
      ) {
        this.winMessage = `${this.itemArray[a]} won`;
      }
    }
  }

  reloadGame() {
    this.isCross = false;
    this.itemArray = new Array(9).fill("");
    this.winMessage = "";
  }
}
