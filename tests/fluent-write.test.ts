import { randomUUID } from "crypto";
import { prisma } from "../src";

beforeEach(async () => {
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();
});
afterAll(async () => {
  await prisma.$disconnect();
});

it('should allow chaining on "create" calls', async () => {
  await expect(
    prisma.user
      .create({
        data: {
          email: randomUUID(),
        },
      })
      .posts()
  ).resolves.toMatchObject([]);
});

it('should allow chaining on "update" calls', async () => {
  const { id, posts } = await prisma.user.create({
    data: {
      email: randomUUID(),
      posts: {
        create: {
          title: "title",
        },
      },
    },
    select: {
      id: true,
      posts: true,
    },
  });

  await expect(
    prisma.user
      .update({
        where: {
          id,
        },
        data: {
          name: randomUUID(),
        },
      })
      .posts()
  ).resolves.toMatchObject(posts);
});

it('should allow chaining on "upsert" calls', async () => {
  const { id, posts } = await prisma.user.create({
    data: {
      email: randomUUID(),
      posts: {
        create: {
          title: "title",
        },
      },
    },
    select: {
      id: true,
      posts: true,
    },
  });

  await expect(
    prisma.user
      .upsert({
        where: {
          id,
        },
        create: {
          email: randomUUID(),
        },
        update: {
          name: randomUUID(),
        },
      })
      .posts()
  ).resolves.toMatchObject(posts);
});

it('should allow chaining on "delete" calls', async () => {
  const { id, posts } = await prisma.user.create({
    data: {
      email: randomUUID(),
      posts: {
        create: {
          title: "title",
        },
      },
    },
    select: {
      id: true,
      posts: true,
    },
  });

  await expect(
    prisma.user
      .delete({
        where: {
          id,
        },
      })
      .posts()
  ).resolves.toMatchObject(posts);
});
