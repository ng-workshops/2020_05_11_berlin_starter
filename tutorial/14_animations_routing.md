# Animations - routing

> ng generate class fadeInAnimation

```ts
import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInAnimation = trigger('fadeInAnimation', [
  // all state transition
  transition('* <=> *', [
    // styles at start of transition
    style({ opacity: 0 }),

    // animation and styles at end of transition
    animate('.5s', style({ opacity: 1 })),
  ]),
]);
```

## src/app/app.component.ts

```ts
...

@Component({
  animations: [fadeInAnimation],
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html',
})

...

getRouteAnimation(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    )
}

...
```

## src/app/app.component.html

```html
...
<div [@fadeInAnimation]="getRouteAnimation(route)">
  <router-outlet #route="outlet"></router-outlet>
</div>
...
```

## src/app/app-routing.module.ts

```ts
...
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, data: { animation: 'home' } },
  { path: '**', component: HomeComponent },
];
...
```

## src/app/customers/customers-routing.module.ts

```ts
...
const routes: Routes = [
  {
    path: 'customers',
    component: CustomerListComponent,
    data: { animation: 'customers' }
  },
  {
    path: 'customers/new',
    component: CustomerFormComponent,
    data: { animation: 'customer' }
  },
  {
    path: 'customers/:id',
    component: CustomerFormComponent,
    data: { animation: 'customer' }
  }
];
...
```

### src/app/app.module.ts

```ts
...

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    CustomersModule,
    HomeModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}

...
```
