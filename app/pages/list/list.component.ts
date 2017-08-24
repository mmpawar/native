import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Grocery } from "../../shared/grocery/grocery";
import { GroceryListService } from "../../shared/grocery/grocery-list.service";
import { TextField } from "ui/text-field";

@Component({
  selector: "list",
  templateUrl: "pages/list/list.html",
  styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
  providers: [GroceryListService]
})
export class ListComponent implements OnInit {
    groceryList: Array<Grocery> = [];
    grocery:  Grocery;
    @ViewChild("groceryTextField") groceryTextField: ElementRef;

    constructor(private groceryListService: GroceryListService) {
        this.grocery = null;
    }

    ngOnInit() {
        this.groceryListService.load()
        .subscribe(loadedGroceries => {
          loadedGroceries.forEach((groceryObject) => {
            this.groceryList.unshift(groceryObject);
          });
        });
    // this.groceryList.push({ name: "Apples" });
    // this.groceryList.push({ name: "Bananas" });
    // this.groceryList.push({ name: "Oranges" });
    }

    add() {
        if (this.grocery.MatchName === "") {
          alert("Enter a grocery item");
          return;
        }
      
        // Dismiss the keyboard
        let textField = <TextField>this.groceryTextField.nativeElement;
        textField.dismissSoftInput();
      
        this.groceryListService.add(this.grocery)
          .subscribe(
            groceryObject => {
              this.groceryList.unshift(groceryObject);
              this.grocery = "";
            },
            () => {
              alert({
                message: "An error occurred while adding an item to your list.",
                okButtonText: "OK"
              });
              this.grocery = "";
            }
          )
      }
}
