/*
  Warnings:

  - Added the required column `title` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_datetime" DATETIME NOT NULL
);
INSERT INTO "new_Note" ("created_datetime", "id", "text", "updated_datetime") SELECT "created_datetime", "id", "text", "updated_datetime" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
