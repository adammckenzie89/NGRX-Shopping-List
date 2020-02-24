import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { LoadShoppingAction,
  ShoppingActionTypes,
   LoadShoppingSuccessAction,
   LoadShoppingFailureAction,
   AddItemAction,
   AddItemSuccessAction,
   AddItemFailureAction,
   RemoveItemAction,
   RemoveItemSuccessAction,
   RemoveItemFailureAction } from '../actions/shopping.actions';
import { of } from 'rxjs';
import { ShoppingService } from 'src/app/shopping.service';

@Injectable()
export class ShoppingEffects {

  @Effect() loadShopping$ = this.actions$
    .pipe(
      ofType<LoadShoppingAction>(ShoppingActionTypes.LOAD_SHOPPING),
      mergeMap(
        () => this.shoppingService.getShoppingItems()
          .pipe(
            map(data => {
              return new LoadShoppingSuccessAction(data);
            }),
            catchError(error => of(new LoadShoppingFailureAction(error)))
          )
      ),
  );

  @Effect() addShoppingItem$ = this.actions$
    .pipe(
      ofType<AddItemAction>(ShoppingActionTypes.ADD_ITEM),
      mergeMap(
        (data) => this.shoppingService.addShoppingItem(data.payload)
          .pipe(
            map(() => new AddItemSuccessAction(data.payload)),
            catchError(error => of(new AddItemFailureAction(error)))
          )
      )
  );

  @Effect() removeShoppingItem$ = this.actions$
    .pipe(
      ofType<RemoveItemAction>(ShoppingActionTypes.REMOVE_ITEM),
      mergeMap(
        (data) => this.shoppingService.deleteShoppingItem(data.payload)
          .pipe(
            map(() => new RemoveItemSuccessAction(data.payload)),
            catchError(error => of(new RemoveItemFailureAction(error)))
          )
      )
    );


  constructor(
    private actions$: Actions,
    private shoppingService: ShoppingService
  ) { }
}
