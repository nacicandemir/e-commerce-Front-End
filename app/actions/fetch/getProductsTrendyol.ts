"use server";

export interface TrendyolProduct {
  id: number;
  name: string;
  price?: {
    discountedPrice?: number;
  };
  imageUrl?: string;
  brand?: string;
  url?: string;
}

export interface TrendyolGroup {
  name: string;
  id: string;
  slug: string
  products?: TrendyolProduct[];
}

function parseResultToGroups(
  result: Record<string, TrendyolProduct[]>,
  categoryLabel: string,
  categorySlug:string
): TrendyolGroup[] {
  return Object.entries(result).map(([id, products]) => ({
    name: categoryLabel,
    slug: categorySlug,
    id,
    products,
  }));
}

export async function fetchMenProducts(): Promise<TrendyolGroup[]> {
  const res = await fetch(
    "https://apigw.trendyol.com/discovery-web-websfxproductgroups-santral/api/v2/product-groups?productGroupIds=590482787&productGroupIds=31656317&productGroupIds=4392612&productGroupIds=697003984&productGroupIds=182843897&productGroupIds=264334181&productGroupIds=530734640&productGroupIds=682581478&productGroupIds=592937727&productGroupIds=562426998&productGroupIds=289828135&productGroupIds=82670458&productGroupIds=68697941&productGroupIds=551645&productGroupIds=183504545&productGroupIds=31199602&productGroupIds=592271604&productGroupIds=641129475&productGroupIds=89663539&productGroupIds=234025345&productGroupIds=224016680&productGroupIds=634535304&productGroupIds=641671460&productGroupIds=36556560&channelId=1"
  );
  const data = await res.json();
  return parseResultToGroups(data.result, "Erkek", "erkek");
}

export async function fetchWomenProducts(): Promise<TrendyolGroup[]> {
  const res = await fetch(
    "https://apigw.trendyol.com/discovery-web-websfxproductgroups-santral/api/v2/product-groups?productGroupIds=688608242&productGroupIds=703329699&productGroupIds=715794938&productGroupIds=680082517&productGroupIds=721760593&productGroupIds=685753956&productGroupIds=688608242&productGroupIds=622800035&productGroupIds=692558921&productGroupIds=715511141&productGroupIds=559847694&productGroupIds=705508742&productGroupIds=688608242&productGroupIds=642826853&productGroupIds=717959942&productGroupIds=704899688&productGroupIds=690917543&productGroupIds=717624279&productGroupIds=721932195&productGroupIds=622541731&productGroupIds=721760593&productGroupIds=558863236&productGroupIds=728834861&productGroupIds=629896535&channelId=1"
  );
  const data = await res.json();
  return parseResultToGroups(data.result,"Kadın", "kadin");
}

export async function fetchElectronics(): Promise<TrendyolGroup[]> {
  const res = await fetch(
    "https://apigw.trendyol.com/discovery-web-websfxproductgroups-santral/api/v2/product-groups?productGroupIds=64221026&productGroupIds=552223982&productGroupIds=646033982&productGroupIds=72206814&productGroupIds=85390068&productGroupIds=652931127&productGroupIds=577948661&productGroupIds=78060783&productGroupIds=713862931&productGroupIds=71513601&productGroupIds=66556325&productGroupIds=684221714&productGroupIds=129449205&productGroupIds=315562114&productGroupIds=680079107&productGroupIds=73178059&productGroupIds=63745554&productGroupIds=690161673&productGroupIds=73178058&productGroupIds=612128303&productGroupIds=660050805&productGroupIds=66106842&productGroupIds=47800868&productGroupIds=128017074&channelId=1"
  );
  const data = await res.json();
  return parseResultToGroups(data.result,"Elektronik", "elektronik");
}

export async function fetchHomeAndLife(): Promise<TrendyolGroup[]> {
  const res = await fetch(
    "https://apigw.trendyol.com/discovery-web-websfxproductgroups-santral/api/v2/product-groups?productGroupIds=722339141&productGroupIds=727190759&productGroupIds=638024574&productGroupIds=666274254&productGroupIds=688648621&productGroupIds=583786840&productGroupIds=632270098&productGroupIds=563759690&productGroupIds=59669057&productGroupIds=692817137&productGroupIds=236546482&productGroupIds=659507927&productGroupIds=532608916&productGroupIds=608527741&productGroupIds=565956528&productGroupIds=207671341&productGroupIds=115501596&productGroupIds=90642886&productGroupIds=235102846&productGroupIds=151981681&productGroupIds=729119965&productGroupIds=604607553&productGroupIds=67837473&productGroupIds=61977869&channelId=1"
  );
  const data = await res.json();
  return parseResultToGroups(data.result,"Ev&Yaşam", "ev-yasam");
}

export async function fetchSports(): Promise<TrendyolGroup[]> {
  const res = await fetch(
    "https://apigw.trendyol.com/discovery-web-websfxproductgroups-santral/api/v2/product-groups?productGroupIds=685036441&productGroupIds=692563425&productGroupIds=603268606&productGroupIds=266533609&productGroupIds=608203401&productGroupIds=682939158&productGroupIds=297321852&productGroupIds=131192738&productGroupIds=617020870&productGroupIds=681472382&productGroupIds=713851030&productGroupIds=655867031&productGroupIds=39377217&productGroupIds=297321852&productGroupIds=680990709&productGroupIds=39377217&productGroupIds=297321852&productGroupIds=678135832&productGroupIds=559190460&productGroupIds=685676552&productGroupIds=561352109&productGroupIds=3200391&productGroupIds=679297584&productGroupIds=508614808&channelId=1"
  );
  const data = await res.json();
  return parseResultToGroups(data.result,"Spor", "spor");
}

export async function fetchBooksAndMusics(): Promise<TrendyolGroup[]> {
  const res = await fetch(
    "https://apigw.trendyol.com/discovery-web-websfxproductgroups-santral/api/v2/product-groups?productGroupIds=632588082&productGroupIds=80651627&productGroupIds=30940111&productGroupIds=645229361&productGroupIds=602254874&productGroupIds=183157132&productGroupIds=40364352&productGroupIds=702468334&productGroupIds=3526394&productGroupIds=700938458&productGroupIds=224647628&productGroupIds=2789177&productGroupIds=688098915&productGroupIds=80904679&productGroupIds=620691700&productGroupIds=700936994&productGroupIds=606223405&productGroupIds=663358608&productGroupIds=619487780&productGroupIds=38544338&productGroupIds=706088144&productGroupIds=715056521&productGroupIds=604391955&productGroupIds=259247881&channelId=1"
  );
  const data = await res.json();
  return parseResultToGroups(data.result,"Kitaplar&Müzikler", "kitaplar-müzikler");
}
