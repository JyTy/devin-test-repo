-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Note" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "text" TEXT NOT NULL,
    "created_datetime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_datetime" DATETIME NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "Note_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Note" ("authorId", "created_datetime", "id", "text", "title", "updated_datetime") SELECT "authorId", "created_datetime", "id", "text", "title", "updated_datetime" FROM "Note";
DROP TABLE "Note";
ALTER TABLE "new_Note" RENAME TO "Note";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
