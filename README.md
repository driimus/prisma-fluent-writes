# Prisma Fluent API tests

Investigating dropped support for fluent API on mutations

# Cause

Fluent API is only applied to `findUnique` and `findFirst` queries at runtime:

https://github.com/prisma/prisma/blob/c1d4f6ea4a0499759dcc1e43cc6c846ccb8051a8/packages/client/src/runtime/core/model/applyModel.ts#L54

Return types for mutations are still being generated as supporting Fluent API:

https://github.com/prisma/prisma/blob/c1d4f6ea4a0499759dcc1e43cc6c846ccb8051a8/packages/client/src/generation/utils.ts#L268
