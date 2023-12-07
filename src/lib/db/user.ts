import prisma from "./prisma";

export async function getUser(id: string) {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch (error) {
    throw new Error("db getUser error");
  }
}
