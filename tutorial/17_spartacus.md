# Create new Angular App with Spartacus

> ng new mystore --style=scss --routing

> cd mystore

> ng add @spartacus/schematics --pwa --ssr

> ng add @angular/localize

## src/app/app.module.ts

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { translations, translationChunksConfig } from '@spartacus/assets';
import { B2cStorefrontModule } from '@spartacus/storefront';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    B2cStorefrontModule.withConfig({
      backend: {
        occ: {
          baseUrl:
            'https://api.c39j2-walkersde1-d3-public.model-t.cc.commerce.ondemand.com',
          prefix: '/rest/v2/',
        },
      },
      context: {
        baseSite: ['electronics-spa'],
      },
      i18n: {
        resources: translations,
        chunks: translationChunksConfig,
        fallbackLang: 'en',
      },
      features: {
        level: '1.3',
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## src/app/app.component.html

```html
<cx-storefront>Loading...</cx-storefront>
```

## src/styles.scss

```scss
@import '~@spartacus/styles/index';
```

## Validate backend

{server-base-url}/rest/v2/electronics/cms/pages -> https://localhost:9002/rest/v2/electronics/cms/pages

Accept SSL cert

## Browse API

https://localhost:9002/rest/v2/swagger-ui.html

## Start Frontend

> yarn start

https://sap.github.io/spartacus-docs/customizing-cms-components/

ConfigModule.withConfig({
cmsComponents: {
BannerComponent: {
component: CustomBannerComponent;
}
}
});

https://sap.github.io/spartacus-docs/creating-pages-and-components/

# Global styles with css variables

> node_modules/@spartacus/styles/scss/theme/sparta/\_variables.scss

## src/styles.scss

```scss
$primary: yellow;

@import '~@spartacus/styles/index';
```

## Change variables in browser

> Open Dev Tools in Browser
> Select <html> tag in Elements Tab
> Change variales which start with `cx-g`

# Styling with precise selectors

> Find specific selector with `Inspect` element (Right click on element -> Inspect)

## src/styles.scss

```scss
$primary: yellow;

@import '~@spartacus/styles/index';

cx-login a {
  color: var(--cx-white);
  font-weight: var(--cx-font-weight-bold);
}
```

# Extendability with outlets

## src/app/app.component.html

```html
<ng-template cxOutletRef="ProductAddToCartComponent">
  <div class="chat-button">
    <button
      class="btn btn-secondary btn-block"
      type="button"
      onclick="alert('works')"
    >
      Custom cart button
    </button>
  </div>
</ng-template>
```

## With addional settings

```html
<ng-template
  cxOutletRef="ProductAddToCartComponent"
  cxOutletPos="before"
  let-model
>
  <div class="chat-button">
    <button
      class="btn btn-secondary btn-block"
      type="button"
      onclick="alert('works')"
    >
      Custom cart button
    </button>
  </div>
</ng-template>
```

## in Code

```ts
const factory = this.componentFactoryResolver.resolveComponentFactory(
  MyComponent
);
this.outletService.add('cx-storefront', factory, OutletPosition.BEFORE);
```

# Localization

> https://sap.github.io/spartacus-docs/i18n/
> ./node_modules/@spartacus/assets/i18n-assets

## src/app/app.module.ts

```ts
// app.module

import { translations } from '@spartacus/assets';

// ...

export const translationOverwrites = {
  en: {
    // lang
    cart: {
      // chunk
      cartDetails: {
        // keys (nested)
        proceedToCheckout: "Let's checkout!",
      },
    },
  },
};

// ...

imports: [
  B2cStorefrontModule.withConfig({
    i18n: { resources: translations },
  }),
  ConfigModule.withConfig({
    i18n: { resources: translationOverwrites },
  }),
];
```

## Translate in HTML

```html
<input placeholder="{{ 'searchBox.searchHere' | cxTranslate }}" />
```

## Translate in Code

```ts
getPaymentCardContent(payment: PaymentDetails): Observable<Card> {
￼   return combineLatest([
     this.translation.translate('paymentForm.payment'),
     this.translation.translate('paymentCard.expires', {
       month: payment.expiryMonth,
       year: payment.expiryYear,
     }),
   ]).pipe(
     map(([textTitle, textExpires]) => {
       return {
         title: textTitle,
         textBold: payment.accountHolderName,
         text: [payment.cardType.name, payment.cardNumber, textExpires],
       };
     })
   );
}
```

```html
<cx-card [content]="getPaymentCardContent(order.paymentInfo) | async"></cx-card>
```

# Scrolling

## src/app/app.module.ts

> https://sap.github.io/spartacus-docs/infinite-scroll/

```ts
B2cStorefrontModule.withConfig({
  ...

  view: {
    infiniteScroll: {
      active: true,
      productLimit: 500,
      showMoreButton: false,
    },
  },

  ...
})
```

# Routing

> ng generate component static

## src/app/app.module.ts

```ts
@NgModule({
  ...
  imports: [
     RouterModule.forChild([
      {
        path: 'static',
        component: StaticComponent,
        canActivate: [CmsPageGuard],
      },
    ]),
  ]
  ...
```

## Configurable Router Links

## src/app/app.module.ts

```ts
...
imports: [
  UrlModule,
  ConfigModule.withConfig({
    routing: {
      routes: {
        cart: { paths: ['custom/cart-path'] },
        product: { paths: [':productCode/custom/product-path'] },
      },
    },
  }),
]
...
```

## src/app/app.component.html

```html
<a [routerLink]="{ cxRoute: 'cart' } | cxUrl"></a>

<!-- transformed to  -->
<!-- <a [routerLink]="['/', 'custom', 'cart-path']"></a> -->

<a
  [routerLink]="{ cxRoute: 'product', params: { productCode: 1234 } } | cxUrl"
></a>

<!-- transformed to  -->
<!-- <a [routerLink]="['/', 1234, 'custom', 'product-path']"></a> -->
```

# Configure page layout

> https://sap.github.io/spartacus-docs/page-layout/

## src/app/app.module.ts

```ts

ConfigModule.withConfig({
  layoutSlots: {
    header: {
      slots: ['TopHeaderSlot', 'NavigationSlot'],
    },
    footer: {
      slots: ['FooterSlot'],
    },
    LandingPageTemplate: {
      slots: ['Section1', 'Section2A', 'Section2B'],
    },
    StoreFinderPageTemplate: {
      slots: ['MiddleContent', 'SideContent'],
    },
  },
} as LayoutConfig),

```

# Changing the Logo

- Log in to SAP Commerce Backoffice.
- Select WCMS in the left-hand navigation pane, then select the Component child node that appears below.
- Search for the term SiteLogoComponent in the Search box in the top-center panel.
- You can modify the component directly in the Online Catalog, or you can modify it in the Staged Catalog and then perform a sync.
- Open the Administration tab of the SiteLogoComponent, and remove the Media value.
- Click the button labelled … next to the Media field.
- In the pop-up search box that appears, search for the desired media file in your system and select it.
- Save your changes.
