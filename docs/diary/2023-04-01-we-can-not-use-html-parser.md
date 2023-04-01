l---
title: We can not use HTML parser
date: 2023-04-01

---

Because HTML parser (such as `DOMParser`) change user's code.

For example:

```html
a <x-card /> b
```

will be

```html
a <x-card> b</x-card>
```
