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

getRouteAnimation(outlet: RouterOutlet) {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    )

...
```

## src/app/app.component.html

```html
...
<div class="{{ currentTheme }}" [@fadeInAnimation]="getRouteAnimation(route)">
  <router-outlet #route="outlet"></router-outlet>
</div>
...
```

## src/app/home/home-routing.module.ts

```ts
...
const routes = [
  { path: 'home', component: HomeComponent, data: { animation: 'home' } }
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
