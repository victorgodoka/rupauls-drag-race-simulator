import { openDB } from "idb";
import { Queen } from "./queens";
import { Episode } from "./episode";

// Inicializa o banco IndexedDB
const dbPromise = openDB("DragRaceDB", 1, {
  upgrade(db) {
    db.createObjectStore("queens", { keyPath: "name" });
    db.createObjectStore("currentCast", { keyPath: "name" });
    db.createObjectStore("trackRecord", { autoIncrement: true });
  },
});

// Salva Queens criadas pelo usuário
export const saveQueens = async (queens: Queen[]) => {
  const db = await dbPromise;
  const tx = db.transaction("queens", "readwrite");
  const store = tx.objectStore("queens");

  await store.clear(); // Limpa os dados anteriores antes de salvar
  for (const queen of queens) {
    await store.put(queen);
  }
  await tx.done;
};

// Recupera todas as Queens criadas
export const getQueens = async (): Promise<Queen[]> => {
  const db = await dbPromise;
  return await db.getAll("queens");
};

// Salva o elenco selecionado no casting
export const saveCast = async (queens: Queen[]) => {
  const db = await dbPromise;
  const tx = db.transaction("currentCast", "readwrite");
  const store = tx.objectStore("currentCast");

  await store.clear(); // Limpa elenco anterior antes de salvar
  for (const queen of queens) {
    await store.put(queen);
  }
  await tx.done;
};

// Recupera o elenco selecionado
export const getCast = async (): Promise<Queen[]> => {
  const db = await dbPromise;
  return await db.getAll("currentCast");
};

// Salva o histórico da temporada
export const saveTrackRecord = async (episode: Episode) => {
  const db = await dbPromise;
  const tx = db.transaction("trackRecord", "readwrite");
  const store = tx.objectStore("trackRecord");

  await store.put(episode);
  await tx.done;
};

// Recupera todo o histórico da temporada
export const getTrackRecord = async (): Promise<Episode[]> => {
  const db = await dbPromise;
  return await db.getAll("trackRecord");
};

// Reseta os dados da temporada para iniciar uma nova
export const resetSeason = async () => {
  const db = await dbPromise;
  await db.clear("trackRecord");
};
// Reseta os dados da temporada para iniciar uma nova
export const resetEverything = async () => {
  const db = await dbPromise;
  await db.clear("queens");
  await db.clear("currentCast");
  await db.clear("trackRecord");
};
