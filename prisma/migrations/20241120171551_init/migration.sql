-- CreateTable
CREATE TABLE "Waiter" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "userName" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "createAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL,

    CONSTRAINT "Waiter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Waiter_id_key" ON "Waiter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Waiter_userName_key" ON "Waiter"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "Waiter_email_key" ON "Waiter"("email");
