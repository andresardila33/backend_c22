-- CreateTable
CREATE TABLE "Dish" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "category_id" UUID,
    "createAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATE NOT NULL,

    CONSTRAINT "Dish_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dish_id_key" ON "Dish"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Dish_category_id_key" ON "Dish"("category_id");
