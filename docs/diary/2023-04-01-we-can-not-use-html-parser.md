---
title: We can not use HTML parser
date: 2023-04-01
---

Sometimes we do not wish to show user errors.
HTML parser can do this well by
fixing syntax errors based on heuristics.

But we can not use HTML parser in some project like `x-markdown`,
because HTML parser (such as `DOMParser`) change user's code in the follow way:

For example:

```html
a <x-card /> b
```

will be

```html
a <x-card> b</x-card>
```

# Principle

Errors and exceptions are often about ambiguous situation.

Using heuristics to fix error is about making choice in ambiguous situation.

It can be useful, but heuristics are often domain specific.

Be careful about making choice for users.
