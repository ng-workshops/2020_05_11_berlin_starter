# App Component

## src/app/app.component.ts

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {
  showDetails = false;

  customer = {
    id: 1,
    name: 'Simpson',
    firstname: 'Homer',
    hobbies: ['eat', 'sleep', 'beer']
  };

  callMe(phone) {
    alert(`Please call this number: ${phone}`);
  }
}
```

## src/app/app.component.html

```html
<h1>Welcome to app!</h1>

<p>I am "{{customer.name | uppercase}}, {{ customer.firstname }}"</p>

<span>These are my hobbies: </span>
<span *ngFor="let h of customer?.hobbies">{{h}} </span>

<p>I am god in math => 1 + 2 = {{ 1 + 2 }}</p>

<button (click)="showDetails = !showDetails">
  {{ showDetails ? 'Hide' : 'Show'}} the secret message
</button>
<span [hidden]="!showDetails">
  My phone number is 123 456 7890
</span>

<br />

<input #phone placeholder="phone number" />
<button
  [class.app-disabled]="!showDetails"
  [disabled]="!showDetails"
  (click)="callMe(phone.value)"
>
  Call me
</button>

<h5>DEBUG</h5>
<pre>user = <br/>{{ customer | json }}</pre>
```
