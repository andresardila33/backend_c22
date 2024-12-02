-- CreateTable
CREATE TABLE "role" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "userName" VARCHAR(100) NOT NULL,
    "password" TEXT NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "role" VARCHAR(10)[] DEFAULT ARRAY['manager']::VARCHAR(10)[],
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client" (
    "id" UUID NOT NULL,
    "firstName" VARCHAR(100) NOT NULL,
    "lastName" VARCHAR(100) NOT NULL,
    "userName" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "table" (
    "id" UUID NOT NULL,
    "tableNumber" INTEGER NOT NULL DEFAULT 1,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_bill" (
    "id" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total" DOUBLE PRECISION NOT NULL,
    "clientId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "tableId" UUID NOT NULL,

    CONSTRAINT "order_bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_detail" (
    "id" UUID NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "orderBillId" UUID NOT NULL,
    "dishId" UUID NOT NULL,

    CONSTRAINT "order_detail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dish" (
    "id" UUID NOT NULL,
    "dishName" VARCHAR(100) NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" UUID NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dish_image" (
    "id" UUID NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "dishId" UUID NOT NULL,

    CONSTRAINT "dish_image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" UUID NOT NULL,
    "categoryName" VARCHAR(100) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "role_id_key" ON "role"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_userName_key" ON "user"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "user_password_key" ON "user"("password");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "client_id_key" ON "client"("id");

-- CreateIndex
CREATE UNIQUE INDEX "client_userName_key" ON "client"("userName");

-- CreateIndex
CREATE UNIQUE INDEX "table_id_key" ON "table"("id");

-- CreateIndex
CREATE UNIQUE INDEX "table_tableNumber_key" ON "table"("tableNumber");

-- CreateIndex
CREATE UNIQUE INDEX "order_bill_id_key" ON "order_bill"("id");

-- CreateIndex
CREATE UNIQUE INDEX "order_detail_id_key" ON "order_detail"("id");

-- CreateIndex
CREATE UNIQUE INDEX "dish_id_key" ON "dish"("id");

-- CreateIndex
CREATE UNIQUE INDEX "dish_dishName_key" ON "dish"("dishName");

-- CreateIndex
CREATE INDEX "dish_categoryId_idx" ON "dish"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "dish_id_dishName_key" ON "dish"("id", "dishName");

-- CreateIndex
CREATE UNIQUE INDEX "dish_image_id_key" ON "dish_image"("id");

-- CreateIndex
CREATE INDEX "dish_image_dishId_idx" ON "dish_image"("dishId");

-- CreateIndex
CREATE UNIQUE INDEX "category_id_key" ON "category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "category_categoryName_key" ON "category"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "category_id_categoryName_key" ON "category"("id", "categoryName");

-- AddForeignKey
ALTER TABLE "order_bill" ADD CONSTRAINT "order_bill_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_bill" ADD CONSTRAINT "order_bill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_bill" ADD CONSTRAINT "order_bill_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_orderBillId_fkey" FOREIGN KEY ("orderBillId") REFERENCES "order_bill"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_detail" ADD CONSTRAINT "order_detail_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "dish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dish" ADD CONSTRAINT "dish_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dish_image" ADD CONSTRAINT "dish_image_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;
