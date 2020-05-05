# RxJS

## Add footer

## src/app/customers/customer/customer.component.html

```html
...

<div class="footer">
  <button mat-icon-button (click)="edit()">
    <mat-icon>edit</mat-icon>
  </button>
</div>
```

## Add edit function

## src/app/customers/customer/customer.component.ts

```ts
...

constructor(private router: Router) { }

edit() {
  this.router.navigate(['customers', this.customer.id]);
}
```

## Add getById()

## src/app/customers/customer.service.ts

```ts
import { of, Observable } from 'rxjs';

...

getById(id: string): Observable<Customer> {
  return of(this.getAll().find(c => c.id.toString() === id));
}
```

## Extend ngOnInit()

## src/app/customers/customer-form/customer-form.component.ts

```ts
...

constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit() {
    this.form = Customer.toFormGroup();

    this.route.paramMap
      .pipe(
        filter(params => params.get('id') !== 'new'),
        switchMap(params => this.customerService.getById(params.get('id')))
      )
      .subscribe(customer => {
        this.form.patchValue(customer);
      });
  }

// implement cancel()
cancel() {
  this.router.navigate(['customers']);
}
```
