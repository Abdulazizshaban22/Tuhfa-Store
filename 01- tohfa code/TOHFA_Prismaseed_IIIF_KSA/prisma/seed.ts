
/* eslint-disable no-console */
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";

const prisma = new PrismaClient();

/**
 * CONFIG
 * Set SEED_DIR to the folder containing the CSVs from TOHFA_KSA_Seed_v1.zip
 * Defaults to ./seeds/ksa relative to repo root.
 */
const REPO_ROOT = process.cwd();
const SEED_DIR = process.env.SEED_DIR || path.resolve(REPO_ROOT, "seeds", "ksa");

type RegionRow = {
  region_code: string;
  region_name_ar: string;
  capital_ar: string;
};
type CraftTypeRow = {
  craft_code: string;
  name_ar: string;
  region_primary: string;
  description_ar: string;
  patterns: string;
  materials: string;
};
type ArtisanRow = {
  artisan_id: string;
  name_ar: string;
  region_code: string;
  specialties: string; // ";" separated craft codes
  store_handle: string;
  instagram: string;
  bio_ar: string;
};
type ExhibitRow = {
  exhibit_id: string;
  museum_name_ar: string;
  city_ar: string;
  title_ar: string;
  iiif_manifest_url: string;
  description_ar: string;
};
type ProductRow = {
  product_id: string;
  artisan_id: string;
  craft_code: string;
  title_ar: string;
  status: "READY" | "MADE_TO_ORDER" | "MUSEUM_GRADE";
  price_sar: string | number;
  stock_qty: string | number;
  made_to_order_lead_days: string | number;
  museum_exhibit_id: string;
  images: string;
};
type WorkshopRow = {
  workshop_id: string;
  host_type: "ARTISAN" | "MUSEUM";
  host_ref: string; // artisan_id or exhibit_id
  craft_code: string;
  title_ar: string;
  date_start_iso: string;
  duration_hours: string | number;
  price_sar: string | number;
  capacity: string | number;
  venue_ar: string;
  online: string | boolean;
};
type PassportRow = {
  passport_id: string;
  product_id: string;
  qr_text: string;
  nfc_tag_uid: string;
  c2pa_ref: string;
};

function loadCsv<T = any>(filename: string): T[] {
  const fp = path.join(SEED_DIR, filename);
  if (!fs.existsSync(fp)) {
    throw new Error(`CSV not found: ${fp}. Set SEED_DIR env var to your seed folder.`);
  }
  const raw = fs.readFileSync(fp, "utf8");
  const recs: T[] = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });
  return recs;
}

function toInt(x: any, def = 0) {
  const n = parseInt(String(x), 10);
  return Number.isFinite(n) ? n : def;
}
function toBool(x: any) {
  if (typeof x === "boolean") return x;
  const s = String(x).toLowerCase();
  return s === "true" || s === "1" || s === "yes";
}

async function seedRegions(rows: RegionRow[]) {
  for (const r of rows) {
    await prisma.region.upsert({
      where: { code: r.region_code },
      update: { nameAr: r.region_name_ar, capitalAr: r.capital_ar },
      create: { code: r.region_code, nameAr: r.region_name_ar, capitalAr: r.capital_ar },
    });
  }
  console.log(`✓ Regions: ${rows.length}`);
}

async function seedCraftTypes(rows: CraftTypeRow[]) {
  for (const c of rows) {
    await prisma.craftType.upsert({
      where: { code: c.craft_code },
      update: {
        nameAr: c.name_ar,
        regionPrimaryCode: c.region_primary,
        descriptionAr: c.description_ar,
        patterns: c.patterns.split(";").map((s) => s.trim()).filter(Boolean),
        materials: c.materials.split(";").map((s) => s.trim()).filter(Boolean),
      },
      create: {
        code: c.craft_code,
        nameAr: c.name_ar,
        regionPrimaryCode: c.region_primary,
        descriptionAr: c.description_ar,
        patterns: c.patterns.split(";").map((s) => s.trim()).filter(Boolean),
        materials: c.materials.split(";").map((s) => s.trim()).filter(Boolean),
      },
    });
  }
  console.log(`✓ CraftTypes: ${rows.length}`);
}

async function seedArtisans(rows: ArtisanRow[]) {
  for (const a of rows) {
    await prisma.artisan.upsert({
      where: { externalId: a.artisan_id },
      update: {
        nameAr: a.name_ar,
        regionCode: a.region_code,
        specialties: a.specialties.split(";").map((s) => s.trim()).filter(Boolean),
        storeHandle: a.store_handle,
        instagram: a.instagram,
        bioAr: a.bio_ar,
      },
      create: {
        externalId: a.artisan_id,
        nameAr: a.name_ar,
        regionCode: a.region_code,
        specialties: a.specialties.split(";").map((s) => s.trim()).filter(Boolean),
        storeHandle: a.store_handle,
        instagram: a.instagram,
        bioAr: a.bio_ar,
      },
    });
  }
  console.log(`✓ Artisans: ${rows.length}`);
}

async function seedExhibits(rows: ExhibitRow[]) {
  for (const e of rows) {
    await prisma.exhibit.upsert({
      where: { externalId: e.exhibit_id },
      update: {
        museumNameAr: e.museum_name_ar,
        cityAr: e.city_ar,
        titleAr: e.title_ar,
        iiifManifestUrl: e.iiif_manifest_url,
        descriptionAr: e.description_ar,
      },
      create: {
        externalId: e.exhibit_id,
        museumNameAr: e.museum_name_ar,
        cityAr: e.city_ar,
        titleAr: e.title_ar,
        iiifManifestUrl: e.iiif_manifest_url,
        descriptionAr: e.description_ar,
      },
    });
  }
  console.log(`✓ Exhibits: ${rows.length}`);
}

async function seedProducts(rows: ProductRow[]) {
  for (const p of rows) {
    const price = toInt(p.price_sar, 0);
    const stock = toInt(p.stock_qty, 0);
    const lead = toInt(p.made_to_order_lead_days, 0);
    await prisma.product.upsert({
      where: { externalId: p.product_id },
      update: {
        titleAr: p.title_ar,
        status: p.status as any,
        priceSar: price,
        stockQty: stock,
        madeToOrderLeadDays: lead,
        images: p.images ? p.images.split(";").filter(Boolean) : [],
        craftTypeCode: p.craft_code,
        artisan: { connect: { externalId: p.artisan_id } },
        museumExhibit: p.museum_exhibit_id ? { connect: { externalId: p.museum_exhibit_id } } : undefined,
      },
      create: {
        externalId: p.product_id,
        titleAr: p.title_ar,
        status: p.status as any,
        priceSar: price,
        stockQty: stock,
        madeToOrderLeadDays: lead,
        images: p.images ? p.images.split(";").filter(Boolean) : [],
        craftTypeCode: p.craft_code,
        artisan: { connect: { externalId: p.artisan_id } },
        museumExhibit: p.museum_exhibit_id ? { connect: { externalId: p.museum_exhibit_id } } : undefined,
      },
    });
  }
  console.log(`✓ Products: ${rows.length}`);
}

async function seedWorkshops(rows: WorkshopRow[]) {
  for (const w of rows) {
    const dur = toInt(w.duration_hours, 2);
    const price = toInt(w.price_sar, 0);
    const cap = toInt(w.capacity, 10);
    await prisma.workshop.upsert({
      where: { externalId: w.workshop_id },
      update: {
        hostType: w.host_type as any,
        craftTypeCode: w.craft_code,
        titleAr: w.title_ar,
        dateStart: new Date(w.date_start_iso),
        durationHours: dur,
        priceSar: price,
        capacity: cap,
        venueAr: w.venue_ar,
        online: toBool(w.online),
        artisan: w.host_type === "ARTISAN" ? { connect: { externalId: w.host_ref } } : undefined,
        exhibit: w.host_type === "MUSEUM" ? { connect: { externalId: w.host_ref } } : undefined,
      },
      create: {
        externalId: w.workshop_id,
        hostType: w.host_type as any,
        craftTypeCode: w.craft_code,
        titleAr: w.title_ar,
        dateStart: new Date(w.date_start_iso),
        durationHours: dur,
        priceSar: price,
        capacity: cap,
        venueAr: w.venue_ar,
        online: toBool(w.online),
        artisan: w.host_type === "ARTISAN" ? { connect: { externalId: w.host_ref } } : undefined,
        exhibit: w.host_type === "MUSEUM" ? { connect: { externalId: w.host_ref } } : undefined,
      },
    });
  }
  console.log(`✓ Workshops: ${rows.length}`);
}

async function seedPassports(rows: PassportRow[]) {
  for (const p of rows) {
    await prisma.passport.upsert({
      where: { externalId: p.passport_id },
      update: {
        product: { connect: { externalId: p.product_id } },
        qrText: p.qr_text,
        nfcTagUid: p.nfc_tag_uid,
        c2paRef: p.c2pa_ref,
      },
      create: {
        externalId: p.passport_id,
        product: { connect: { externalId: p.product_id } },
        qrText: p.qr_text,
        nfcTagUid: p.nfc_tag_uid,
        c2paRef: p.c2pa_ref,
      },
    });
  }
  console.log(`✓ Passports: ${rows.length}`);
}

async function main() {
  console.log("→ SEED_DIR =", SEED_DIR);

  const regions = loadCsv<RegionRow>("regions.csv");
  const craftTypes = loadCsv<CraftTypeRow>("craft_types.csv");
  const artisans = loadCsv<ArtisanRow>("artisans.csv");
  const exhibits = loadCsv<ExhibitRow>("exhibits.csv");
  const products = loadCsv<ProductRow>("products.csv");
  const workshops = loadCsv<WorkshopRow>("workshops.csv");
  const passports = loadCsv<PassportRow>("passports.csv");

  await seedRegions(regions);
  await seedCraftTypes(craftTypes);
  await seedArtisans(artisans);
  await seedExhibits(exhibits);
  await seedProducts(products);
  await seedWorkshops(workshops);
  await seedPassports(passports);
}

main()
  .then(async () => {
    console.log("✅ Seed completed");
  })
  .catch(async (e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
