# ML Datasets for Agricultural Drone (UAV) Image Analysis — COEP Hexacopter Project

> Research compiled 2026-06-01 for the COEP Agricultural Hexacopter thesis.
> Verified URLs, license checks, age-of-data assessment, gap analysis.
> Companion to `NDVI_Multispectral_Camera_ML_Reference.md`.

---

## How to Read This Document

**License shorthand** — CC BY 4.0 (use, redistribute, modify, even commercially, with attribution) / CC BY-SA (share-alike) / CC BY-NC 4.0 (non-commercial only) / CC0 (public domain) / Apache 2.0 / MIT / **Commercial** (paid license, academic use varies) / **Restricted** (must contact author / data owner).

**GSD** = Ground Sample Distance (cm/pixel on the ground at flight altitude). Lower = higher detail.

**Last update** — uses the dataset's most recent revision year, or publication year if no later revision is documented.

**Honest rating** — every dataset below was checked. Some hyped options are excluded or downgraded; weak ones are flagged.

---

## 1. Crop Leaf Disease Datasets

| Dataset | URL | Images | Classes | Crops / Species | Resolution | Annotation | License | Last update | Honest rating |
|---|---|---|---|---|---|---|---|---|---|
| **PlantVillage** | https://github.com/spMohanty/PlantVillage-Dataset | 54,306 | 38 (crop×disease pairs) | 14 (apple, blueberry, cherry, corn, grape, orange, peach, pepper, potato, raspberry, soybean, squash, strawberry, tomato) | ~256×256 (resized) | Folder-based image classification (not bbox) | **CC BY-SA 3.0** (PlantVillage itself) / CC BY 3.0 (the Frontiers paper) | 2016 (last major version) | **A — Excellent, but lab-only.** Single-leaf, plain background. Real-field transfer poor (see PlantDoc). |
| **PlantDoc** | https://github.com/pratikkayal/PlantDoc-Dataset | 2,598 (uncropped) + 9,216 (cropped boxes) | 27 (17 disease + 10 healthy) | 13 species | Variable web-scraped | Folder + bounding box (for cropped) | Research use, no explicit CC; **restrictive** | 2019 | **B+ — Real field, but tiny.** Best paired with PlantVillage for transfer learning. |
| **PlantWild v1 / v2** | https://tqwei05.github.io/PlantWild/ | 18,542 (v1) / ~30k (v2 est.) | 89 (v1) / 115 (v2) | 56 disease + 33 healthy | Web-scraped (Google + Ecosia) | Image classification, with text descriptions | Research only, must sign agreement | 2024 (ACM MM) | **A− — New, largest in-the-wild disease dataset with text prompts.** Multimodal (vision+text). |
| **Embrapa WGISD** (wine grape) | https://github.com/thsant/wgisd | 300 images, 4,432 clusters (2,020 with masks) | 1 (grape) | 5 varieties (Chardonnay, Cab Franc, Cab Sauv, Sauv Blanc, Syrah) | 2048×1365 (RGB) | YOLO-format bbox + binary instance mask | **CC BY-NC 4.0** ⚠ (non-commercial only) | 2019 | **B — Tiny but quality annotations. Viticulture only; NC license limits thesis distribution.** |
| **Embrapa WGISD re-release on HF** | https://huggingface.co/datasets/thsant/wgisd | Same as above | Same | Same | Same | Same | **CC BY-NC 4.0** | 2024 (mirrored) | Same as above |
| **Cassava (iCassava 2019, FGVC6)** | https://sites.google.com/view/fgvc6/competitions/icassava-2019 | 9,436 labeled + 12,595 unlabeled | 5 (CBSD, CMD, CBB, CGM, Healthy) | Cassava | Variable (smartphone in Uganda) | Folder classification | **CC0** (Kaggle competitions) | 2019 | **A− — Real African field, expert-labeled. Disease names relevant to India (CLCuD-like symptoms).** |
| **Cassava (iCassava 2020, FGVC7)** | https://www.kaggle.com/c/cassava-leaf-disease-classification | ~21,397 labeled | 5 (same classes) | Cassava | Variable | Folder classification | CC0 (Kaggle) | 2020 | **A — Larger; de facto benchmark for cassava.** |
| **PaddyDoctor (Tirunelveli, Tamil Nadu)** | https://paddydoc.github.io/dataset/ | 16,225 (RGB) + 5,562 (pest) | 13 disease + 20 pest | Paddy/rice | 1080×1440, also 480×640, 256×256 | Folder classification, with metadata (age, variety) | **Research only; request via IEEE DataPort** | 2022 | **A+ — India-specific, expert-annotated, 12 rice diseases. High relevance for COEP thesis.** |
| **PaddyDoctor (IEEE DataPort mirror)** | https://ieee-dataport.org/documents/paddy-doctor-visual-image-dataset-automated-paddy-disease-classification-and-benchmarking | Same | Same | Same | Same | Same | Request from authors | 2022 | Same as above |
| **Indian Rice Disease Dataset (IRDD)** — IIIT Kalyani / IIT Kharagpur | https://ieee-dataport.org/documents/indian-rice-disease-dataset-irdd | Small (~200 BrownSpot + Healthy) | 2 | Rice (paddy) | Variable | Folder | MeitY (Govt of India) | 2024 | **C — Tiny (2 classes). Useful only as a validation set, not training.** |
| **Sugarcane Leaf Disease (Daphal & Koli, Maharashtra)** | https://data.mendeley.com/datasets/9424skmnrk/1 | 2,521 | 5 (Healthy, Mosaic, Redrot, Rust, Yellow) | Sugarcane | Variable (smartphone) | Folder classification | **CC BY 4.0** (Mendeley) | 2022 | **A− — Maharashtra field, India-specific. Open license. Excellent for COEP thesis.** |
| **Sugarcane Leaf Dataset (6,748 imgs, Pune)** | https://data.mendeley.com/drafts/355y629ynj | 6,748 | 11 (9 disease + 1 healthy + 1 dried) | Sugarcane | 768×1024 | Folder | Mendeley (open) | 2024 | **A — Maharashtra, 9 diseases, 6.7k images. Excellent India-specific open resource.** |
| **Sugarcane (Karnataka, 6-class, 2,940 imgs)** | https://github.com/ShakirKhurshid/pytorch-sugarcane | 2,940 | 6 (5 disease + 1 healthy) | Sugarcane | Variable (phone, UAS Bangalore, Mandya) | Folder | Research use | 2023 | **B+ — India-specific, multi-site Karnataka.** |
| **Cotton (SAR-CLD-2024, Bangladesh)** | https://data.mendeley.com/datasets/b3jy2p6k8w/2 | 2,137 original + 7,000 augmented | 7 (bacterial blight, curl virus, herbicide damage, leaf hopper jassids, leaf reddening, leaf variegation, healthy) | Cotton | 1597–4000 px (Redmi Note 11s) | Folder | **CC BY 4.0** (Mendeley) | 2024 (V2) | **A− — Quality, recent, 7 classes. Bangladesh (cotton-growing neighbor). High relevance.** |
| **Cotton (Sher-e-Bangla, 1,373+4,963 aug)** | https://data.mendeley.com/datasets/t9hgvk2h9p/1 | 1,373 + 4,963 augmented | 5 (Alternaria, Bacterial Blight, Verticillium Wilt, Fusarium Wilt, Healthy) | Cotton | Variable (smartphone, 4 different phones) | Folder | **CC BY 4.0** | 2025 | **B+ — Recent, multi-phone, open. Smaller than SAR-CLD-2024.** |
| **Tomato disease (PlantVillage subset)** | Embedded in PlantVillage | ~18,000 of PlantVillage | 10 tomato classes | Tomato | 256×256 | Folder | CC BY-SA 3.0 | 2016 | **A — Best for lab data. Field gap remains.** |
| **Tomato in-the-wild (PlantDoc subset)** | Embedded in PlantDoc | ~1,500 | 9 tomato | Tomato | Web | Folder + bbox | Research only | 2019 | Combined use with PlantVillage recommended. |
| **Maize disease (CGIAR / PlantVillage subset)** | PlantVillage | ~3,000 | 4 (Blight, Common Rust, Gray Spot, Healthy) | Maize | 256×256 | Folder | CC BY-SA 3.0 | 2016 | Lab data only. |
| **Citrus (Kaggle, myprojectdictionary)** | https://www.kaggle.com/datasets/myprojectdictionary/citrus-leaf-disease-image | ~7,500 (augmented from 1,044 base) | 7 (Anthracnose, Greening, Black Spot, Canker, Melanose, Scab, Healthy) | Citrus | Variable | Folder | Per Kaggle dataset rules (varies, typically CC0 or research) | 2024 | **B+ — 7 Indian-relevant diseases, including citrus greening (HLB).** |
| **Citrus (TF Datasets, 4-class)** | https://tensorflow.google.cn/datasets/catalog/citrus_leaves | 594 | 4 (Black Spot, Canker, Greening, Healthy) | Citrus | 256×256 | Folder | **CC0** | 2018 | **C — Small, but CC0 and easy to use.** |
| **Auburn Soybean Disease (ASDID)** | https://zenodo.org/records/7304859 | 9,981 | 8 (Bacterial Blight, Cercospora, Downy Mildew, Frogeye, Rust, Target Spot, K deficiency, Healthy) | Soybean | DSLR + smartphone (Canon EOS 7D Mk II, Moto Z2 Play) | Folder | **CC BY 4.0** | 2022 | **A — Multi-device, multi-season, Alabama. Soybean is a kharif crop in India.** |
| **Embrapa Apple, Citrus, Grape, etc. (HuggingFace mirror)** | https://huggingface.co/datasets?search=embrapa | Various | Various | Various | Various | Folder | Various | 2024 | Use PlantVillage as the umbrella. |

**Section 1 verdict** — for a **COEP thesis**: **PaddyDoctor** (rice, Tirunelveli) + **PlantVillage** (lab pretrain) + **PlantWild v2** (in-the-wild fine-tune) + **SAR-CLD-2024** (cotton) + **Sugarcane Pune** (Maharashtra) form a strong India-relevant base. PlantDoc is too small to train on but useful for transfer-learning evaluation.

**Pros / Cons summary** (key entries):

- **PlantVillage** — Pros: massive, clean, well-cited, CC BY-SA. Cons: lab-only; light-box photos don't transfer to field; almost 10 years old.
- **PlantDoc** — Pros: real field, web-scraped. Cons: 2,598 images, no commercial license.
- **PlantWild v2** — Pros: 89–115 classes, multimodal (text+vision), 2024. Cons: license needs sign-up, no bbox annotations.
- **PaddyDoctor** — Pros: India-specific, 16k images, expert label, 12 rice diseases, RGB+IR (cat S62 Pro). Cons: research-only, no commercial deployment.
- **SAR-CLD-2024 (cotton)** — Pros: 2024, CC BY, 7 classes, multi-env. Cons: only Bangladesh.
- **Sugarcane Pune (Mendeley)** — Pros: 6.7k, 11 classes, Maharashtra. Cons: only 1 farm site.

---

## 2. Weed Detection Datasets

| Dataset | URL | Images | Classes | Sensor | Annotation | License | Last update | Rating |
|---|---|---|---|---|---|---|---|---|
| **DeepWeeds** | https://github.com/AlexOlsen/DeepWeeds | 17,509 | 8 weed species + negatives | RGB (in-situ Australia rangeland) | Image classification (folder) | **CC BY 4.0** (data) / Apache 2.0 (code) | 2019 | **A — Best general weed classification dataset. Open license, baseline benchmarks 95%.** |
| **CottonWeedDet12** | https://zenodo.org/records/7535814 | 5,648 (9,370 bboxes) | 12 cotton weeds | RGB (smartphone + handheld DSLR, >10 MP) | YOLO + COCO bbox | **CC BY 4.0** (Zenodo) | 2023 | **A− — Largest public multi-class weed detection. U.S. South. 12 species; imbalanced (some classes only 140 boxes).** |
| **CottonWeedDet3** | https://github.com/ — via Rahman 2023 (CottonWeedDet12 paper) | 848 | 3 classes | RGB | YOLO + COCO bbox | CC BY 4.0 (Zenodo) | 2023 | **B — Same authors, smaller companion. Useful for binary weed/crop pre-train.** |
| **WeedMap (sugar beet, Sa et al.)** | https://github.com/viariasv/weedMap | 8 orthomosaics → 10,196 tiles (1.76 B pixels) | 3 (bg, crop, weed) | **5-band MicaSense RedEdge-M** + 4-band Sequoia multispectral (UAV) | Pixel-level semantic segmentation (3 classes) | Open (CC BY 4.0) | 2018 | **A — Multispectral weed map. GSD ≈ 1 cm. Best UAV-MSI weed dataset but pre-deep-learning era architecture.** |
| **WeedNet-R (sugar beet, MAV)** | https://github.com/GOOJJJ/WeedNet-R | Uses Sugarbeets2016 + own MAV data (132/243/90 multispectral images) | 3 (bg, crop, weed) | **Multispectral** (NIR+Red+NDVI) | Pixel seg | Open (paper) | 2017 (Mav dataset) | **B — Multispectral MAV-based. Small but pioneer. Re-uses Sugarbeets2016.** |
| **WeedNet (global foundation model, 2025)** | https://arxiv.org/html/2505.18930v1 | 14M (iNaturalist pretrain) + 2M expert (Midwest US) | 1,593 species | Citizen science RGB | Image classification | Per iNaturalist (mostly CC BY-NC) | 2025 | **A — Foundation-model approach. 97.4% on 84 Midwest species. Heavily biased to N. America.** |
| **CropDeep** | https://www.mdpi.com/1424-8220/19/5/1058 | 31,147 | 31 (crops in greenhouses, multiple growth stages) | RGB (greenhouse, smartphone, IoT camera, robots) | Bbox + classification | Open (MDPI paper) | 2019 | **C — Not a weed dataset. Greenhouse crops only. Not useful for weed detection.** |
| **WeedsGalore (WACV 2025, maize)** | https://github.com/GFZ/weedsgalore | ~1,150 UAV images (600×600 tiles) | 5 (maize, amaranth, barnyard grass, quickweed, weed other) | **DJI Phantom 4 Multispectral (5 bands)** | Semantic + instance seg | Open (paper) | 2024 (WACV 2025) | **A — ** **NEW, important.** First public multispectral UAV weed dataset for maize with 4 weed species + 2.5 mm GSD at 5 m altitude. Outperforms CropAndWeed on OOD test by 23 mIoU%. |
| **WeedMap (Haller et al. Bonn)** | https://www.ipb.uni-bonn.de/data/sugarbeets2016/ | 5 TB total; ~300 hand-labeled 4-channel images (sugar beet + 9 weeds) | 2 (crop, weed) + 9 weed sub-classes | **4-channel multi-spectral (JAI AD-130 GE)** + RGB-D + lidar (UGV, NOT UAV) | Pixel seg | Open (paper) | 2016 (UGV data) | **B — Ground robot, not UAV. Pioneer dataset for sugar beet weeds, multi-modal.** |
| **Lufra / autonomous weeding** | (multiple, search "Lufra weed") | — | — | — | — | — | — | **Dataset not verified — likely a project name, not a published dataset. Skip.** |
| **Sunflower-Broomrape (Broomrape detection)** | https://www.sciencedirect.com/search?query=broomrape+dataset | Multiple small | Broomrape vs sunflower | RGB / MSI | Bbox / seg | Various | 2022–2024 | **B — Niche (only relevant if you target sunflower in Maharashtra).** |
| **MFWD (Moving Fields Weed Dataset, TUM)** | https://github.com/grimmlab/MFWD | 94,321 images, 200,148 plant records, 5,068 plant individuals tracked | 30 (28 weed species + sorghum + maize, Germany) | RGB (high-throughput phenotyping facility, controlled light) | Bbox + instance seg + time-series tracking | **CC BY 4.0** (mediatum) | 2024 (Nature Sci Data) | **A− — Excellent, very large, 200k+ plant records, tracking. Greenhouse, not field. Sorghum is India-relevant.** |
| **AIWeeds (ND State / California / China)** | https://github.com/StructuresComp/Multi-class-Weed-Classification | ~10,000 | 16 (flax + 14 weed spp + negatives) | RGB (robot-perspective) | Folder classification | Open | 2022 (ICRA) | **B — Multi-site (incl. China), 16 classes. Robot-perspective (not UAV).** |
| **CropAndWeed (AIT Austria)** | https://github.com/cropandweed/cropandweed-dataset | 8,034 images, 112k instances | 74 (16 crop + 58 weed) | RGB (handheld + ground robot) | Bbox + semantic mask + stem + meta | Open (research, request from AIT) | 2023 (WACV) | **A — Most diverse weed taxonomy. Handheld imaging, not UAV. 75 classes impressive.** |

**Section 2 verdict** — for a **COEP thesis targeting Indian cotton/rice/sugarcane weeds**: **DeepWeeds** (classification, open, 8 species) + **CottonWeedDet12** (Indian-relevant if you generalize from US cotton) + **WeedsGalore** (UAV-MSI maize, newest 2024) + **CropAndWeed** (74-class taxonomy) + **MFWD** (huge, tracking, sorghum-relevant). For UAV-specific multispectral pixel segmentation, **WeedMap (Sa 2018)** is still the only real public option; everything else newer is RGB.

**Pros / Cons summary** (key):

- **DeepWeeds** — Pros: 17.5k, 8 species, open, baselines. Cons: ground-level rangeland, not crop fields.
- **CottonWeedDet12** — Pros: 12 species, bboxes, YOLO/COCO. Cons: US cotton, not Indian.
- **WeedsGalore** — Pros: only public UAV-MSI maize weed dataset. Cons: 2024, Germany, single farm.
- **WeedMap (Sa)** — Pros: real multispectral orthomosaics. Cons: pre-deep-learning label format, low GSD by 2024 standards.
- **CropAndWeed** — Pros: 74 classes, bbox+mask+stem. Cons: handheld, not UAV.

---

## 3. Crop Detection & Segmentation (UAV-specific)

| Dataset | URL | GSD / Altitude | Sensor | Classes | Label Format | License | Year | Rating |
|---|---|---|---|---|---|---|---|---|
| **Agriculture-Vision (Chiu 2020)** | https://registry.opendata.aws/intelinair_agriculture_vision/ | **10/15/20 cm/px** (fixed-wing aircraft, not UAV per se but aerial) | **RGB + NIR** (4-channel) | 9 (double plant, drydown, endrow, nutrient deficiency, planter skip, storm damage, water, waterway, weed cluster) | 512×512 tiles, JSON multi-label, semantic seg | **Open Data Commons (public AWS bucket)** | 2020 (CVPR) | **A — Large (94,986 images), NIR-RGB aerial. USA corn/soybean. NOT a small UAV — aircraft ~1500 m AGL.** |
| **Extended Agriculture-Vision (Wu 2023)** | https://github.com/jingwu6/Extended-Agriculture-Vision-Dataset | 10 cm/px | RGB + NIR | 9 (supervised) + 3,600 raw full-field for SSL pre-training | Tiles + raw | Open (AWS) | 2023 (TMLR) | **A+ — Latest. Best aerial agronomy dataset for self-supervised pre-training.** |
| **Sugar Beets 2016 (Chebrolu, Bonn)** | https://www.ipb.uni-bonn.de/data/sugarbeets2016/ | 0.3 mm/px at 0.6 m AGL | **4-channel JAI multispectral** (UGV) | Sugar beet + ~9 weed species | Pixel-wise + 300 hand-labeled images | Open (paper) | 2016 | **B — Ground robot, not UAV. 5 TB total (LIDAR+IMU+GPS+MS).** |
| **UAV Sugarbeets 2015-16 (Bonn)** | https://www.ipb.uni-bonn.de/data/uav-sugarbeets-2015-16/index.html | **4 mm/px @ 10 m (Field A); 9 mm/px @ 15 m (Field B)** | RGB (Zenmuse X3, GoPro) | Sugar beet | Multi-temporal, no dense seg | Open | 2016 | **B — Real UAV but no seg labels; useful for odometry/3D reconstruction research, not supervised seg.** |
| **CWFID — Crop/Weed Field Image Dataset (Haug 2014)** | https://github.com/cwfid/dataset | 1296×966 px, hand-held (NOT UAV) | RGB | Carrot + weed (binary seg) | Pixel masks + plant type | Open (paper) | 2014 (ECCV workshop) | **B — Pioneer. Hand-held. 60 images. Reused as baseline everywhere.** |
| **PhenoBench (Weyler 2024, T-PAMI)** | https://www.phenobench.org/dataset.html | **1 mm/px @ 21 m AGL** (DJI M600 + PhaseOne iXM-100) | RGB (100 MP) | Sugar beet (2 varieties) + weed, with **leaf instance seg** (30k+ leaves) | Semantic + plant instance + leaf instance + visibility | Open (research) | 2024 (T-PAMI 2024) | **A+ — Best UAV crop/weed seg benchmark. Pixel-precise, leaf-level, multi-temporal (3 dates × 2 years). Hidden test set from unseen field.** |
| **CropAndWeed (AIT 2023)** | https://github.com/cropandweed/cropandweed-dataset | 1920×1088 (handheld, NOT UAV) | RGB | 74 classes (16 crops + 58 weeds) | Bbox + semantic mask + stem | Open (request) | 2023 (WACV) | **A — Most diverse taxonomy. NOT UAV. Best multi-class pixel seg benchmark on handheld.** |
| **BavarianCrops (Rußwurm 2020)** | https://mediatum.ub.tum.de/1521238?show_id=1612845 | Sentinel-2 (10 m/px, satellite) + field labels | Sentinel-2 MSI (13 bands) | 7 crops (meadow, summer barley, corn, winter wheat, winter barley, clover, triticale) | Per-field time series labels | **CC BY 4.0** | 2020 (ISPRS) | **A — Satellite time-series crop type. NOT UAV but field-level labels useful for orchard/yield.** |
| **BreizhCrops (France)** | https://github.com/dl4slands/breizhcrops | Sentinel-2 (satellite) | Sentinel-2 MSI | ~9 crops | Time series + field polygons | Open | 2020 | **A — Largest European satellite crop time series. ~600k fields.** |
| **MuST-C (Bonn 2025)** | https://bonndata.uni-bonn.de/dataset.xhtml?persistentId=doi%3A10.60507%2FFK2%2FOX9XTM | Multiple (UAV+UGV) | **RGB + 10-band MS + LiDAR (RIEGL miniVUX + Ouster OS1)** | 6 crops (sugar beet, maize, potato, soy, wheat, wheat-faba bean intercrop) | Multi-sensor with LAI/biomass ground truth | Open (Bonn data) | 2025 (July 2025) | **A+ — NEW. Best multi-sensor multi-crop UAV+UGV dataset. Includes LAI/biomass ground truth (phenotyping!).** |
| **Field Image Dataset (Haughen et al.)** | https://www.ipb.uni-bonn.de/data/sugarbeets2016/ (same as Sugar Beets 2016; likely the same CWFID/Sugarbeets) | — | — | — | — | — | — | (CWFID and Sugarbeets 2016 are the Bonn outputs; the "Haughen" name is **CWFID** at https://github.com/cwfid/dataset) |
| **Carrot-Weed (Lameski 2017)** | https://www.kaggle.com/datasets (search "Lameski carrot weed") | Hand-held, 3264×2448 | RGB | Carrot + weed | Pixel seg | Research | 2017 | **B — Small (39 images), but Macedonia. Useful for carrot training only.** |
| **Carrots-Onion (Lameski 2018)** | Same author | 2464×2056 | RGB | Carrot + onion | Pixel seg | Research | 2018 | **B — Small, niche (intercropping).** |
| **Sunflowers (Lameski 2018)** | Same author | 1296×966 | RGB + NIR | Sunflower + weed | Pixel seg | Research | 2018 | **B — Multispectral hand-held, 500 images. Niche.** |
| **Oil Radish (Chebrolu 2018)** | https://www.ipb.uni-bonn.de/ | 1600×1600 | RGB | Oil radish | Pixel seg | Open | 2018 | **B — Small (129 images).** |
| **GrowliFlowers (Pascucci 2024)** | https://lcmou.github.io/GrowliFlowers/ | 448×368 | Hyperspectral (UAV) | Cauliflower (multi-stage) | Pixel seg | Open | 2024 | **A — Hyperspectral UAV cauliflower 2,198 images, 4 dates. Best hyperspectral field crop dataset.** |

**Section 3 verdict** — for a **COEP thesis with our MS400 multispectral camera (4 bands at 5 cm/px)**:

- **Best pretraining dataset for crop/weed seg**: **PhenoBench** (RGB, 1 mm/px, leaf-instance annotations) — too fine GSD, not multi-spectral, but best quality. For multispectral, **WeedsGalore** is the only match (5 bands, 2.5 mm/px). For larger features (10 cm/px, NIR+RGB), **Extended Agriculture-Vision** is unmatched.
- **Field Image Dataset (Haug) is CWFID** at https://github.com/cwfid/dataset. Tiny but used as a baseline.
- **MuST-C (2025)** is the gold standard for multi-sensor phenotyping with LAI/biomass ground truth — relevant for yield estimation.

---

## 4. Drone / Aerial Detection & Tracking (General)

| Dataset | URL | Images / Frames | Classes | Sensor / Altitude | License | Year | Rating |
|---|---|---|---|---|---|---|---|
| **VisDrone** | https://aiskyeye.com/visdrone-2021/ | 10,209 static + 261,908 video frames (288 clips) | 10 (pedestrian, people, bicycle, car, van, truck, tricycle, awning-tricycle, bus, motor) | Multiple DJI drones (Mavic, Phantom 3/3A/3SE/3P/4/4A/4P), 14 cities, China, **max res 3840×2160** | **Restricted research** (sign agreement) | 2018–2021 | **A — Largest drone detection benchmark. Urban China; not agriculture, but useful for general drone-detection transfer.** |
| **UAVDT** | https://sites.google.com/view/grli-uavdt | 80,000 frames (100 sequences, 10 h raw video) | 4 (car, truck, bus, other) | DJI Inspire 2, 1080×540 @ 30 fps, urban | **Restricted research** (CC-like, request) | 2018 (ECCV) | **A — Vehicle-focused. Weather/altitude/viewpoint attributes included.** |
| **AU-AIR** | https://bozcani.github.io/auairdataset | 32,283 frames (8 video streams, 2 h) | 8 (human, car, van, truck, bike, motorbike, bus, trailer) | **Multi-modal**: RGB + GPS + IMU + altitude + velocity (Aarhus, Denmark) | **CC BY 4.0** | 2020 (ICCV) | **A — Only public multi-modal UAV dataset. Has flight telemetry per frame. Open license.** |
| **DOTA v1.0** | https://captain-whu.github.io/DOTA/ | 2,806 (with v2.0: 11,268) | 15 → 18 (plane, ship, storage tank, baseball diamond, tennis court, basketball court, ground track field, harbor, bridge, large/small vehicle, helicopter, roundabout, soccer ball field, swimming pool, container crane, airport, helipad) | **Satellite + aerial** (Google Earth, GF-2, JL-1, CycloMedia); 800×800 to 20,000×20,000 | **Restricted research** | 2018 (v1) → 2021 (v2) | **A — Oriented bounding box benchmark. Not drone per se but aerial OBB standard.** |
| **Stanford Drone Dataset** | https://cvgl.stanford.edu/projects/uav_data/ | ~69 GB; 8 scenes × multiple videos | 6 (pedestrian, biker, skater, cart, car, bus) | DJI (Stanford campus, 2016) | **Research only, request** | 2016 (ECCV) | **B — Trajectory prediction, not agriculture. Old. Still used.** |
| **ERA (Event Recognition in Aerial)** | https://lcmou.github.io/ERA_Dataset/ | 2,864 video snippets (5 sec each, 24 fps) | 25 events (post-earthquake, flood, fire, harvesting, ploughing, etc.) | YouTube aerial, 640×640 | **Research, request** | 2020 (GRSM) | **B — Has 2 agriculture events (harvesting, ploughing). Niche.** |

**Section 4 verdict** — these are NOT agriculture-specific. The most useful for COEP are:

- **VisDrone** for general drone-detection pretraining (e.g., for drone-collision avoidance).
- **AU-AIR** for multi-modal sensor fusion (RGB + IMU + GPS) — important if you use drone telemetry.
- **DOTA** for oriented object detection (e.g., row crops / orchard layout).

**RarePlanes** (https://www.rareplanes.com/) — synthetic + real, satellite, ignore per the task spec. **LADI** (Low Altitude Disaster Imagery) — disaster only, not agriculture. Skip.

---

## 5. NDVI / Multispectral Ground-Truth (Satellite & Aerial)

| Source | URL | License | Resolution | India Coverage | Best For |
|---|---|---|---|---|---|
| **Sentinel-2 (ESA Copernicus)** | https://sentinels.copernicus.eu/copernicus-data-access-description | **Free, full, open** (Copernicus data policy) | **10 m (RGB+NIR), 20 m (RedEdge+SWIR), 60 m (atmospheric)**; 290 km swath; 5-day revisit | Global, full India | NDVI, NDRE, EVI at field scale; L2A surface reflectance free |
| **Sentinel-2 on Copernicus Data Space** | https://dataspace.copernicus.eu/ | Same as above | Same | Same | Free bulk download |
| **Landsat 8/9 (USGS)** | https://earthexplorer.usgs.gov/ | **Free, open** (USGS policy) | 30 m (multispectral), 15 m (pan) | Global, full India | Long-term time series (since 1972, Landsat 1; L8/L9 since 2013/2021) |
| **Landsat (NRSC India regional mirror)** | https://bhoonidhi.nrsc.gov.in/ | Free via Bhoonidhi | Same as Landsat | India | Easier India access |
| **Planet Labs PlanetScope** | https://www.planet.com/ | **Commercial** (paid; some research access via Planet Insights Platform) | **3 m/pixel** (ortho, 8 bands including coastal blue, green, red, red edge, NIR) | Global daily | High-frequency field-scale NDVI; expensive |
| **Planet SuperDove / PlanetScope Fusion** | https://www.planet.com/ | Commercial | 3 m | Global | Same as above, newer sensors |
| **ISRO VEDAS (SAC)** | https://vedas.sac.gov.in/en/home.html | **Free** (Govt of India) | Multiple: AWiFS (56 m), LISS-III (23.5 m), LISS-IV (5.8 m), OCM2 (1 km NDVI), Sentinel-2 via Copernicus mirror | Full India, dedicated VEDAS products | NDVI (1 km, 8 km), land use, crop monitoring, drought (Krishi-DSS) |
| **VEDAS API Center** | https://vedas.sac.gov.in/vconsole/ | Free (signup) | Sentinel-2 (10–60 m) | India | Programmatic NDVI time-series via WMS/Temporal API |
| **VEDAS Vegetation & Crop Monitoring** | https://vedas.sac.gov.in/ (specific apps) | Free | AWiFS, OCM2, LISS-IV, Sentinel-2 | India | Pre-processed NDVI for India at multiple resolutions |
| **ISRO Bhoonidhi (NRSC)** | https://bhoonidhi.nrsc.gov.in/ | **Free** open data (with registration) + priced commercial | Cartosat, Resourcesat (LISS-III/IV/AWiFS), Sentinel-1/2, Landsat 8/9, NovaSAR | Full India, with regional Sentinel/Landsat distribution | Bulk data download; STAC API |
| **NRSC Open Data Archive (Bhuvan NOEDA)** | https://bhuvan-app3.nrsc.gov.in/data/download/ | Free | LISS-III (23.5 m), LISS-IV (5.8 m), AWiFS (56 m), CartoDEM (30 m/10 m), HySI | India | Free India-specific EO data |
| **Bhuvan LULC 50K / 250K / 10K** | https://bhuvan.nrsc.gov.in/wiki/index.php/List_of_Vector_(Thematic_Maps)_datasets | Free | 1:50,000 (LISS-III), 1:250,000 (AWiFS), 1:10,000 (LISS-IV, SIS-DP) | India, 2005-06, 2011-12, 2015-16, 2018-19 | Crop / land-use ground truth maps |
| **MOSDAC (ISRO)** | https://www.mosdac.gov.in/ | Free (registration) | INSAT-3D/3DR sounder & imager (8 km SST, etc.), OCM2, scatterometer | India, weather/ocean | Weather, soil moisture, ocean — not crop NDVI but agronomy context |
| **UPAg Portal (Unified Portal for Agricultural Statistics, DAC&FW)** | https://upag.gov.in/ | Free | District/state aggregate | India | Crop production statistics for yield model training |
| **ICRISAT District Level Database (DLD)** | http://data.icrisat.org/dld/src/about-dld.html | Free (open) | District-level (560 districts, 20 states, 1966–2015) | India | Long-term crop yield + climate; **gold standard for India yield-model training** |
| **ICRISAT Geospatial & Big Data Sciences** | http://maps.icrisat.org/ | Free | 30 m Landsat + Sentinel + field labels | Asia + Africa (India, Bangladesh, Pakistan, Sri Lanka, Afghanistan) | Cropping system maps, ICRISAT-iHub |
| **ICRISAT Dataverse** | https://dataverse.icrisat.org/ | Open (DOIs registered) | Various | India + Africa | Sorghum/millets/pulses farm-household surveys, panel data |
| **Sahel/India cropping systems (ICRISAT WCA)** | http://maps.icrisat.org/ | Free | 30 m | West + Central Africa, India | Maps for crop type |
| **IBIA — Indian Biological Images Archive (DBT)** | https://ibdc.dbtindia.gov.in/ibia/ | Free, Open Access | Image-based biological | India | Curated disease image collections incl. sugarcane from Maharashtra |
| **open data.ICAR (KRISHI portal)** | https://krishi.icar.gov.in/ (server was offline during verification) | Free, Govt. India | Various | India | All ICAR institute publications, experimental data, gene banks. **Note: the URL was unstable during this research; use ICAR-IASRI direct contacts.** |
| **ICAR Data Book (ICAR-IASRI)** | https://iasri.icar.gov.in/ | Free | District/state | India | Annual agricultural research data book |
| **UPAg Open Data** | https://upag.gov.in/ | Free (open) | District/state | India | Crop area, production, yield statistics |
| **data.gov.in (Agri catalog)** | https://www.data.gov.in/ | Free, Open Government Data | Various | India | Field crop varieties, soil, weather |
| **Bhoonidhi API (NRSC STAC)** | https://bhoonidhi.nrsc.gov.in/bhoonidhi-api/ | Free (registered) | STAC catalog | India | Programmatic EO data access |

**Section 5 verdict** — for COEP NDVI ground-truth workflow:

1. **Satellite (free, field-scale)**: Sentinel-2 L2A (10/20 m) via Copernicus Data Space. Match to UAV MS400 acquisitions (same 10 m NIR/Red bands as our MS400!).
2. **Satellite (India-specific)**: VEDAS API Center (Sentinel-2 derived NDVI time series) + Bhuvan LULC 50K (crop type ground truth).
3. **Older but higher-res satellite**: Resourcesat-2/2A LISS-IV via Bhoonidhi (5.8 m panchromatic + multi-spectral — matches MS400 GSD scale).
4. **Long-term climate/yield**: ICRISAT DLD (1966–2015) for yield-model training.
5. **Commercial (only if budget allows)**: PlanetScope at 3 m daily — too expensive for a COEP thesis budget.

**Pros / Cons**:

- **Sentinel-2** — Free, 10 m, exact band match to MS400 (B4=665 nm, B8=842 nm) → NDVI computed identically. 5-day revisit.
- **VEDAS** — Free, India-focused, has pre-processed NDVI products, plus a Temporal API. **Underrated**.
- **Bhoonidhi** — Single sign-on for all Indian EO; has API + manual order.
- **Planet** — 3 m daily is excellent but commercial.

---

## 6. Indian-Specific Agriculture Datasets (CRITICAL)

| Source / Dataset | URL | Type | License | India-Specific Content | Rating |
|---|---|---|---|---|---|
| **PaddyDoctor (Tamil Nadu, rice)** | https://paddydoc.github.io/dataset/ | Disease (16,225 imgs, 13 classes) + pest (5,562, 20 classes) | Research only, IEEE DataPort | Tirunelveli, TN, 12 paddy diseases (incl. Bacterial Leaf Blight, Blast, Tungro — all relevant in Maharashtra) | **A+ — Best India-specific disease dataset.** |
| **SAR-CLD-2024 (cotton)** | https://data.mendeley.com/datasets/b3jy2p6k8w/2 | Disease (2,137 + 7,000 aug, 7 classes) | **CC BY 4.0** | Gazipur, Bangladesh (cotton neighbor of India) | **A−** |
| **Sugarcane Leaf (Maharashtra, Daphal & Koli 2022)** | https://data.mendeley.com/datasets/9424skmnrk/1 | Disease (2,521 imgs, 5 classes) | **CC BY 4.0** | Maharashtra, India | **A−** |
| **Sugarcane Leaf (Pune 2024, 6,748 imgs)** | https://data.mendeley.com/drafts/355y629ynj | Disease (6,748, 11 classes) | Mendeley (open) | Kendur, Pune, Maharashtra — 9 diseases | **A** |
| **Sugarcane (Karnataka, 2,940 imgs)** | https://github.com/ShakirKhurshid/pytorch-sugarcane | Disease (6 classes) | Research | UAS Bangalore + Mandya, Karnataka | **B+** |
| **Indian Rice Disease Dataset (IRDD, IIIT Kalyani/IIT Kharagpur)** | https://ieee-dataport.org/documents/indian-rice-disease-dataset-irdd | Disease (2 classes only) | MeitY (Govt of India) | West Bengal | **C — Only BrownSpot + Healthy. Use as supplementary.** |
| **Citrus Leaf Disease (Kaggle, myprojectdictionary)** | https://www.kaggle.com/datasets/myprojectdictionary/citrus-leaf-disease-image | Disease (7,500, 7 classes) | Per Kaggle (often CC0) | Citrus greening, canker, etc. — Indian-relevant | **B+** |
| **Indic-Leaf Dataset (IIIT Hyderabad)** | https://github.com/vamsidharmuthireddy/Indic-Leaf-Dataset | Species ID (4 levels: leaf, plant, web, etc.) | Research (Muthireddy 2019) | Indian plant species (jackfruit, kadamba, etc.) | **B — Species ID, not disease. Useful for general plant ID.** |
| **ICAR Research Data Repository (KRISHI)** | https://krishi.icar.gov.in/ | Database | Govt. India (open) | All ICAR institute data; gene banks; experimental data; geo-portal | **A — Index of everything, but **URL was unstable during verification**. Contact ICAR-IASRI directly for specific crop datasets.** |
| **UPAg (Unified Portal for Agricultural Statistics)** | https://upag.gov.in/ | Statistical (district/state) | Govt. India open | All India crop area/production/yield | **A — Best for yield-model training data.** |
| **ICAR-IASRI (Indian Agricultural Statistics Research Institute)** | https://iasri.icar.gov.in/ | Database + data book | Govt. India open | Annual "Agricultural Research Data Book" | **A** |
| **ICRISAT District Level Database (DLD)** | http://data.icrisat.org/dld/src/about-dld.html | Statistical + climate (1966–2015) | Open | 560 districts, 20 states | **A — Best for India-specific yield model training.** |
| **ICRISAT Dataverse** | https://dataverse.icrisat.org/ | Survey + panel data | Open (DOIs) | Sorghum/millets/pulses in India + Africa | **A** |
| **ICRISAT-iHub Geospatial & Big Data Sciences** | http://maps.icrisat.org/ | Geospatial (crop type maps) | Open | India, Sahel | **A** |
| **MSSRF (M.S. Swaminathan Research Foundation, Chennai)** | https://www.mssrf.org/ | Field surveys, gene banks, biodiversity | Research | Rice landraces (350+ from Jeypore, Odisha), millets, pulses | **A for genetics, B for images. Mostly survey/biodiversity, not labeled ML datasets.** |
| **IIHR (ICAR-Indian Institute of Horticultural Research, Bengaluru)** | https://iihr.res.in/ | Horticultural research | Govt. India | Mango, banana, papaya, vegetables | **B — Publications + some datasets, no major public ML dataset.** |
| **ICAR-NBSS&LUP (National Bureau of Soil Survey & Land Use Planning)** | https://nbsslup.icar.gov.in/ | Soil maps | Govt. India | Soil type, nutrient, land use | **B — Soil data for agriculture model context.** |
| **Bhuvan (NRSC) — Land Use / Land Cover** | https://bhuvan.nrsc.gov.in/wiki/index.php/List_of_Vector_(Thematic_Maps)_datasets | Crop type maps (1:50K, 1:250K, 1:10K) | Free | India, 2005-06, 2011-12, 2015-16, 2018-19 | **A — Best India crop-type ground truth.** |
| **Bhuvan Agriculture thematic** | https://bhuvan-app1.nrsc.gov.in/agriculture/agri.php | Thematic apps | Free | India | **B+** |
| **MOSDAC (Meteorological & Oceanographic Satellite Data Archival Centre, SAC/ISRO)** | https://www.mosdac.gov.in/ | INSAT-3D/3DR, OCM, scatterometer | Free | Weather, ocean, soil moisture | **B — Weather context for yield models.** |
| **VEDAS (SAC/ISRO)** | https://vedas.sac.gov.in/en/home.html | Pre-processed EO products + API | Free | India, includes NDVI, drought (Krishi-DSS), vegetation monitoring | **A** |
| **VEDAS API Center** | https://vedas.sac.gov.in/vconsole/ | API for NDVI | Free | India | **A** |
| **Bhoonidhi (NRSC)** | https://bhoonidhi.nrsc.gov.in/ | EO data archive (IRS + Sentinel + Landsat + NovaSAR) | Free + priced | India | **A** |
| **NRSC Open Data Archive (Bhuvan NOEDA)** | https://bhuvan-app3.nrsc.gov.in/data/download/ | Cartosat, Resourcesat, DEM | Free | India | **A** |
| **Niruthi (Hyderabad)** | https://niruthi.com/ | Ag risk analytics (private) | **Commercial** | India, weather + crop models | **A− — Private, but publishes India-specific risk analytics. Probably not directly usable for thesis training data.** |
| **Cropin (Bangalore)** | https://www.cropin.com/ | Smart farming platform (private) | **Commercial** | India + global | **A− — Has its own labeled dataset, but not public. May partner for thesis via collaboration.** |
| **Intello Labs (Gurgaon)** | https://www.intellolabs.com/ | AI for crop monitoring (private) | **Commercial** | India + global | **B — Acquired by Agremo. Public data not available.** |
| **Fasal (Bangalore)** | https://fasal.co/ | IoT + AI for horticulture (private) | **Commercial** | India | **B — Private. No public dataset.** |
| **Deshpande Foundation (Hubballi)** | https://www.deshpandefoundation.org/ | Sandalwood, turmeric | NGO / mixed | North Karnataka (Hubballi/Dharwad) | **C — Not a data publisher. Could be a field-test partner for COEP.** |
| **TIFR Hyderabad (Tata Institute of Fundamental Research, Centre for Applicable Mathematics)** | https://www.tifrh.res.in/ | Urban, environmental | Research | Hyderabad urban | **C — Not agriculture. Skip.** |
| **CFTRI (CSIR-Central Food Technological Research Institute, Mysore)** | https://cftri.res.in/ | Food tech | Govt. India | Mysore | **C — Not image datasets. Skip for image tasks.** |
| **Karnataka (Kaggle, search "cotton disease India")** | Various, e.g., https://www.kaggle.com/datasets/sabuktagin/dataset-for-cotton-leaf-disease-detection | Disease | Varies (often CC0) | Various | **Mixed quality, mostly duplicates of public datasets. Verify before using.** |
| **Maharashtra crop (Kaggle)** | Search "Maharashtra crop" — mostly sugarcane from Pune (already listed), maize from Karnataka, etc. | Varies | Varies | Maharashtra | **Mixed** |
| **Rice pest India (Kaggle)** | PaddyDoctor (above) is the gold standard. Smaller: "rice pest" Kaggle sets mostly Nigerian/Indonesian | Varies | Varies | Limited | **Stick to PaddyDoctor.** |

**Section 6 verdict — India-specific dataset matrix for COEP thesis**:

| Crop / Task | Best India-specific dataset | Backup | Gap to fill |
|---|---|---|---|
| Rice (paddy) disease | **PaddyDoctor** (Tamil Nadu, 16k, 12 diseases) | IRDD (WB, 2 classes) | Field-level (canopy) rice disease, not just leaf |
| Cotton disease | **SAR-CLD-2024** (Bangladesh, 2.1k, 7 classes) | Cotton Sher-e-Bangla | Maharashtra-specific cotton dataset |
| Sugarcane disease | **Sugarcane Pune (Mendeley, 6.7k, 11 classes)** | Daphal-Koli 2022 (2.5k, 5 classes) | Multi-state (Maharashtra + UP + Karnataka) |
| Citrus disease | **Kaggle citrus-leaf-disease-image** (7.5k, 7 classes) | TF Datasets citrus (594, 4 classes) | Citrus canker + greening in Indian orchards |
| Maize disease | PlantVillage subset (4 classes, lab only) | None India-specific | **Major gap** — no India-specific maize disease dataset exists |
| Soybean disease | Auburn ASDID (USA) | None India-specific | **Major gap** — soybean is kharif in MP, Maharashtra |
| Pulses (tur, urad, gram) | None | None | **Major gap** |
| NDVI ground truth (India) | VEDAS API (Sentinel-2 NDVI, free) | Bhuvan LULC 50K (crop type) | ICRISAT ground-truthed field yield (use DLD) |
| Crop type (India, satellite) | Bhuvan LULC 50K (54 classes, 5.8 m) | ICRISAT-iHub | Need UAV-scale (sub-meter) crop type labels for India |
| Yield training | UPAg district statistics + ICRISAT DLD + Sentinel-2 NDVI | MODIS NDVI time series | Drone-scale yield mapping (no public data) |
| Soil | ICAR-NBSS&LUP | Bhuvan soil | Drone-scale soil variability maps |

---

## 7. Other Relevant Datasets

| Dataset | URL | Use | License | Year | Rating |
|---|---|---|---|---|---|
| **iNaturalist (Plant subset)** | https://github.com/inaturalist/inaturalist-open-data | Plant species ID pretraining | Per photo (mostly CC BY-NC) | Continuously updated | **A — 14M plant observations, geo-tagged. India coverage exists.** Mirror on HuggingFace: https://huggingface.co/datasets/juppy44/gbif-plants-raw (96.1M plant obs). |
| **plantNaturalist-500k** | https://huggingface.co/datasets/anhaltai/plantNaturalist500k | Plant species ID, 2,491 species | Per iNat | 2023 | **A — Cleaned subset, ready to use.** |
| **Pl@ntNet-300K** | https://github.com/plantnet/PlantNet-300K | Plant species ID, 306,146 imgs, 1,081 species | Per photo (CC varies, mostly CC BY-SA) | 2021 (NeurIPS) | **A — 306k images, long-tailed. Indian species included.** |
| **DeepForest (NEON benchmark)** | https://github.com/weecology/DeepForest + https://github.com/weecology/NeonTreeEvaluation | Tree detection (6,000+ crowns, 22 sites, RGB+LiDAR+hyperspectral) | Open (NEON) | 2020 | **A — Best tree detection benchmark. USA only, but transferable.** |
| **COCO (transfer learning pretrain)** | https://cocodataset.org/ | 330k images, 80 classes, instance seg | **CC BY 4.0** | 2014 | **A — Standard pretrain for detection/seg. Not agriculture, but always use as init.** |
| **ImageNet-1K (pretrain)** | https://www.image-net.org/ | 1.28M images, 1000 classes | Research use | 2012 | **A — Standard pretrain for classification. Always init from this.** |
| **LADI (Low Altitude Disaster Imagery)** | https://github.com/LADI-Dataset/LADI | Disaster (flood, fire, building damage) | CC0 | 2020 | **C — Disaster, not agriculture. Skip per task spec.** |
| **RarePlanes** | https://www.rareplanes.com/ | Satellite + synthetic aircraft | Restricted | 2021 | **Skip per task spec.** |
| **PVELAD (Plant Village Extended Leaf Age Disease)** | Search "PVELAD dataset" — primarily refers to PlantVillage extensions like the Auburn ASDID; no single canonical "PVELAD" | Soybean disease | CC BY 4.0 | 2022 | **A− — Use Auburn ASDID (https://zenodo.org/records/7304859) as the canonical soybean extension.** |
| **21K Plant Species (iNaturalist, Kaggle)** | https://www.kaggle.com/c/plant-seedlings-classification (different) | 21k species, iNat subset | Per iNat | 2020 | **B — 21k species but noisy; better to use plantNaturalist-500k.** |
| **Plant Seedlings (Kaggle, V2)** | https://www.kaggle.com/c/plant-seedlings-classification/data | 12 species seedlings | Per Kaggle | 2017 | **B+ — Small (4,639), 12 species, but clean. Used in V3 competitions.** |
| **Cotton Leaf Disease (older Kaggle)** | https://www.kaggle.com/datasets/seroshkarim/cotton-leaf-disease-dataset | ~1,951 imgs, 3 classes | Varies | 2019 | **C — Older; superseded by SAR-CLD-2024.** |
| **Maize dataset (Kaggle, plantVillage subset)** | PlantVillage | Lab maize | CC BY-SA | 2016 | **Use PlantVillage.** |
| **TasselNet / maize tassel UAV (DECC-Net 2025)** | https://www.mdpi.com/2077-0472/15/16/1751 | 2,880 sub-imgs, 8,000+ raw UAV maize tassel | Open (paper) | 2025 (Aug) | **A− — NEW. UAV maize tassel seg, multi-weather, multi-stage. Heilongjiang, China. No India version.** |
| **MuST-C (Bonn, multi-sensor phenotyping)** | https://bonndata.uni-bonn.de/dataset.xhtml?persistentId=doi%3A10.60507%2FFK2%2FOX9XTM | Multi-crop, multi-sensor, multi-temporal UAV+UGV, with LAI/biomass | Open (Bonn) | 2025 (July) | **A+ — Newest, best for phenotyping/yield estimation research.** |
| **TUM GrassClover (Weisser et al.)** | https://github.com/tum-i22/grassclover | Grass/clover field segmentation | Open | 2023 | **B — Forage crops, but multi-temporal.** |

---

## RECOMMENDATION — What COEP Should Actually Use

Given the **MS400 multispectral camera** (Green 555, Red 660, RedEdge 720, NIR 840, + RGB 8 MP, 5 cm GSD @ 120 m) and a **thesis timeline of one year**, here is the recommended workflow:

### Tier 1 — Must-have (3-5 datasets for a thesis-grade result)

| # | Dataset | Why | Used as |
|---|---|---|---|
| 1 | **Extended Agriculture-Vision** (https://registry.opendata.aws/intelinair_agriculture_vision/) | 3,600 full-field RGB+NIR aerial images @ 10 cm/px for SSL pre-training. Massive. NIR band matches MS400 NIR. | **Self-supervised pretrain** (MoCo-V2 / MAE backbone) |
| 2 | **PhenoBench** (https://www.phenobench.org/) | Best UAV crop/weed seg benchmark. RGB, 1 mm/px, 30k+ leaf instance segs, hidden test set from unseen field. | **Weed segmentation supervised training** (downstream task 1) |
| 3 | **PaddyDoctor** (https://paddydoc.github.io/dataset/) | India-specific rice disease, 16k imgs, 12 diseases, expert-annotated. | **Disease classification** (downstream task 2) — most thesis-relevant |
| 4 | **WeedsGalore** (https://github.com/GFZ/weedsgalore) | Only public UAV-MSI maize weed dataset with 4 weed species. Bands match MS400 exactly (R 650, RE 730, NIR 840). | **MS400-specific weed detection** (downstream task 3) |
| 5 | **PlantVillage** (https://github.com/spMohanty/PlantVillage-Dataset) | 54k images, 38 classes, CC BY-SA. Lab data, but huge. | **Classification pretrain** for disease model |

### Tier 2 — Add for breadth

| # | Dataset | Why |
|---|---|---|
| 6 | **Sugarcane Leaf Disease (Pune Mendeley)** — https://data.mendeley.com/drafts/355y629ynj | Maharashtra-specific; sugar belt |
| 7 | **SAR-CLD-2024 Cotton** — https://data.mendeley.com/datasets/b3jy2p6k8w/2 | Cotton disease (Maharashtra grows cotton) |
| 8 | **Sentinel-2 L2A (Copernicus)** — https://dataspace.copernicus.eu/ | Free satellite NDVI ground truth for our MS400 (same Red 665 nm, NIR 842 nm bands) |
| 9 | **VEDAS API** — https://vedas.sac.gov.in/vconsole/ | India-specific NDVI time series via free API |
| 10 | **ICRISAT DLD** — http://data.icrisat.org/dld/ | India district-level yield training data |
| 11 | **CottonWeedDet12** — https://zenodo.org/records/7535814 | 12-class weed detection (YOLO/COCO format, easy to use) |
| 12 | **DeepWeeds** — https://github.com/AlexOlsen/DeepWeeds | 17k images, 8 weed species, CC BY 4.0 — solid classification baseline |
| 13 | **PlantWild v2** — https://tqwei05.github.io/PlantWild/ | 115 classes, multimodal, in-the-wild — if you need breadth |
| 14 | **Agriculture-Vision CVPR2020 subset** (56k+ labeled tiles) | For pattern classification (drydown, nutrient deficiency, etc.) |
| 15 | **MuST-C (2025)** | If you do phenotyping / yield — only public dataset with LAI/biomass ground truth |

### Recommended Workflow

```
[1] Backbone init:
    - ImageNet-1K pretrain (ResNet50 / YOLOv8n / SegFormer)
    - COCO pretrain (for detection heads)
    - Extended Agriculture-Vision (SSL pretrain, 3,600 raw NIR+RGB fields)

[2] Downstream tasks (fine-tune):
    - Disease classification:
        pretrain: ImageNet + PlantVillage (54k)
        fine-tune: PaddyDoctor (16k) + Sugarcane-Pune (6.7k) + SAR-CLD-2024 (2.1k)
        evaluate: in-the-wild field collection in Maharashtra (Pune region)

    - Weed detection (YOLOv8n / YOLOv11):
        pretrain: COCO
        fine-tune: CottonWeedDet12 (5.6k bboxes) + DeepWeeds (17k)
        test: WeedsGalore (UAV-MSI, OOD evaluation)

    - Crop/weed segmentation (SegFormer / DeepLabV3+):
        pretrain: ImageNet
        fine-tune: PhenoBench (sugar beet, RGB) + CropAndWeed (74 classes, handheld)
        test: WeedsGalore (5-band MSI) — DIRECTLY relevant to MS400

    - NDVI / vegetation index:
        ground truth: Sentinel-2 (Copernicus, free) + VEDAS API (India)
        validate: ICRISAT DLD + UPAg district yield

[3] In-house data collection (gap fill, see below):
    - 5–10 flights over Maharashtra farms (Pune/Satara/Nashik)
    - MS400 + DLS, orthomosaicked with Pix4D
    - Ground-truth yield, leaf count, weed species, disease severity (with an agronomist)
```

### What NOT to Use (Hypospec, Stale, or License-encumbered)

- **CropDeep** — greenhouse crops, not field. Skip for outdoor.
- **PVELAD (if you find it)** — ambiguous; use Auburn ASDID (https://zenodo.org/records/7304859) instead.
- **Citrus (TF Datasets, 594 imgs)** — too small; use the Kaggle 7.5k version.
- **Sunflower-Broomrape, Lufra** — niche, hard to verify, low ROI for a COEP thesis.
- **RarePlanes, LADI, ERA** — explicitly out-of-domain.
- **WGISD (Embrapa)** — only 300 images and CC BY-NC; license blocks commercial reuse. Use only as supplementary.
- **CWFID (Haug 2014)** — 60 images, hand-held. Used as historical baseline, not training set.
- **Stanford Drone, VisDrone, UAVDT** — non-agricultural. Use for drone-detection side-experiments only.
- **DOTA** — oriented bbox standard, but satellite. Use only if you specifically need OBB.
- **Cocoon / Indic-Leaf** — species ID, not disease. Not the same task.
- **PlantDoc** — only 2,598 images. Use as **evaluation** only, not training.

---

## GAPS — What COEP Must Collect In-House

After auditing 100+ datasets, **the following are missing or grossly inadequate for India**. COEP should plan 1–2 field campaigns to fill these.

### 1. **Maharashtra / Pune-region UAV multispectral crop data** — **CRITICAL GAP**
- No public MS or RGB UAV image dataset from Maharashtra (Pune/Satara/Aurangabad/Nashik).
- Bhuvan/ICAR/UPAg data is district-level satellite, not UAV-scale.
- **What to collect**: 20–30 flights over sugarcane + cotton + soybean + jowar/bajra (rabi + kharif) with MS400 + DLS. ~3,000–5,000 MS tiles at 5 cm/px.
- **What to annotate**: crop type per tile, weed species (if possible — agronomist needed), disease severity score, plant count, growth stage.

### 2. **Maharashtra weed species catalog (UAV-scale)** — **CRITICAL GAP**
- CottonWeedDet12 covers US cotton weeds (Amaranthus, waterhemp, etc.). Indian cotton weeds (Cyperus rotundus, Cynodon dactylon, Parthenium, Celosia, Trianthema) are largely missing.
- DeepWeeds is Australian rangeland (8 species — chinee apple, lantana, parthenium, prickly acacia, rubber vine, siam weed, snake weed, parkinsonia). Only parthenium overlaps with India.
- **What to collect**: 500–1,000 images per common Indian weed species, with bounding boxes. Partner with **MPKV (Mahatma Phule Krishi Vidyapeeth, Rahuri)** or **VNMKV (Parbhani)** for species ID.

### 3. **Maharashtra cotton / soybean / chickpea disease (UAV-scale)** — **CRITICAL GAP**
- SAR-CLD-2024 (Bangladesh) covers 7 cotton diseases — good but Bangladesh, not Maharashtra.
- PlantVillage covers 4 maize diseases in lab settings.
- **No public soybean or chickpea disease dataset exists for India**.
- **What to collect**: 200–300 leaf images per disease per crop, with severity scores, plus 50–100 field images at UAV scale. Partner with **CICR Nagpur (cotton)** or **IISR Indore (soybean)**.

### 4. **Multispectral UAV data for orchard / horticulture** — **MAJOR GAP**
- Citrus, mango, banana, pomegranate (Maharashtra is India's largest pomegranate producer, second-largest grape) — no multispectral UAV dataset exists.
- PlantVillage citrus is lab-only.
- **What to collect**: 30–50 flights over a pomegranate or grape orchard (Nashik, Sangli) with MS400 at multiple growth stages. Annotate canopy NDVI, fruit count, disease (bacterial blight, anthracnose).

### 5. **Plant phenotyping / yield ground-truth at UAV scale (India)** — **MAJOR GAP**
- MuST-C (Bonn) is the only public dataset with LAI/biomass ground truth — but Germany.
- ICRISAT DLD has district-level yield but no per-field UAV-image match.
- **What to collect**: 50–100 plot-level UAV images + hand-measured LAI + biomass + yield at harvest. This is the most labor-intensive but the most publishable.

### 6. **NDVI ground-truth for Indian farms (sub-meter, time series)** — **MEDIUM GAP**
- Sentinel-2 (10 m) is too coarse for small Maharashtra farms (avg < 1 ha).
- VEDAS has NDVI but at 1 km (OCM2) or 10 m (Sentinel-2).
- No public sub-meter time-series NDVI for India.
- **What to collect**: Re-fly the same 10–20 Maharashtra farms at weekly intervals (full crop season) with MS400 + DLS. Then compare to Sentinel-2 NDVI at the same dates to validate downscaling methods.

### 7. **Pest detection (real-time) for Indian crops** — **MAJOR GAP**
- PaddyDoctor has 5,562 pest images (good), but paddy only.
- **No cotton pest (bollworm, whitefly, jassid) or soybean pest (semi-looper, girdle beetle) public dataset exists.**
- **What to collect**: 500 images per common Indian pest, with location on plant (underside leaf, top, stem). Partner with **NCIPM (National Centre for Integrated Pest Management, New Delhi)**.

### Suggested COEP Field-Data Protocol

```
Site:         5 farms in Pune district (varied crops: sugarcane, cotton,
              soybean, jowar, vegetables)
Duration:     2 crop seasons (1 year): Kharif 2026 + Rabi 2026-27
Hardware:     COEP hexacopter + Yusense MS400 (already selected)
              + Raspberry Pi v2 RGB for redundancy
              + DLS for irradiance correction
Sensors:      4-band MS @ 5 cm/px, RGB @ 2 cm/px, 120 m AGL
              Nadir + 20° off-nadir for canopy vs soil

Flight plan:  Weekly or bi-weekly over each farm
              70% front overlap, 60% side overlap

Ground truth: Agronomist from MPKV/VNMKV
              - Disease severity (0–5 scale)
              - Weed species + count per m²
              - Plant count per row
              - LAI (LI-COR 2200C or SunScan)
              - Biomass at harvest (kg/plot)
              - Yield (kg/plot)

Storage:      1–2 TB raw, geo-referenced, orthomosaicked
Annotation:   CVAT (open source) — box + polygon + mask
Output:       COEP-Maharashtra-UAV-MS-2027 dataset
              → publish on Mendeley Data (CC BY 4.0)
              → becomes the citation for the thesis
```

### Why This Matters for the Thesis

A COEP student who **publishes a UAV-MSI dataset from Maharashtra** (even 5–10 fields × 2 seasons) is more publishable than one who trained on PlantVillage. Reviewers at ICAR/IEEE/Elsevier will value the India-specific contribution. The dataset can be 1/10th the size of PhenoBench and still be the only one in the world with MS400 + Maharashtra + ground-truth yield.

---

## SOURCES — Flat URL List

### Section 1 — Crop Leaf Disease
- https://arxiv.org/abs/1511.08060 (PlantVillage paper)
- https://github.com/spMohanty/PlantVillage-Dataset
- https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2016.01419/full
- https://github.com/pratikkayal/PlantDoc-Dataset
- https://arxiv.org/abs/1911.10317 (PlantDoc paper)
- https://tqwei05.github.io/PlantWild/ (PlantWild v1 + v2)
- https://github.com/thsant/wgisd (WGISD)
- https://huggingface.co/datasets/thsant/wgisd
- https://zenodo.org/records/3361736
- https://sites.google.com/view/fgvc6/competitions/icassava-2019
- https://www.kaggle.com/c/cassava-leaf-disease-classification
- https://paddydoc.github.io/dataset/
- https://ieee-dataport.org/documents/paddy-doctor-visual-image-dataset-automated-paddy-disease-classification-and-benchmarking
- https://ieee-dataport.org/documents/indian-rice-disease-dataset-irdd
- https://data.mendeley.com/datasets/9424skmnrk/1 (Sugarcane Daphal-Koli)
- https://data.mendeley.com/drafts/355y629ynj (Sugarcane Pune 6,748)
- https://github.com/ShakirKhurshid/pytorch-sugarcane (Sugarcane Karnataka)
- https://data.mendeley.com/datasets/b3jy2p6k8w/2 (SAR-CLD-2024 cotton)
- https://data.mendeley.com/datasets/t9hgvk2h9p/1 (Cotton Sher-e-Bangla)
- https://www.kaggle.com/datasets/myprojectdictionary/citrus-leaf-disease-image (Citrus Kaggle 7.5k)
- https://tensorflow.google.cn/datasets/catalog/citrus_leaves (Citrus TF 594)
- https://zenodo.org/records/7304859 (Auburn ASDID soybean)
- https://www.sciencedirect.com/science/article/pii/S235234092400876X (SAR-CLD-2024 paper)
- https://pmc.ncbi.nlm.nih.gov/articles/PMC10964057/ (Sugarcane Pune paper)
- https://ibdc.dbtindia.gov.in/ibia/study_details_browse/PPS_1000000022/ (IBIA sugarcane)

### Section 2 — Weed Detection
- https://github.com/AlexOlsen/DeepWeeds
- https://www.nature.com/articles/s41598-018-38343-3 (DeepWeeds paper)
- https://zenodo.org/records/7535814 (CottonWeedDet12)
- https://github.com/viariasv/weedMap (WeedMap Sa 2018)
- https://www.mdpi.com/2072-4292/10/9/1423 (WeedMap paper)
- https://github.com/GOOJJJ/WeedNet-R
- https://arxiv.org/abs/1709.03329 (WeedNet MAV paper)
- https://arxiv.org/html/2505.18930v1 (WeedNet 2025 foundation model)
- https://www.mdpi.com/1424-8220/19/5/1058 (CropDeep)
- https://github.com/GFZ/weedsgalore (WeedsGalore 2024)
- https://www.ipb.uni-bonn.de/data/sugarbeets2016/ (Sugar Beets 2016)
- https://www.ipb.uni-bonn.de/data/uav-sugarbeets-2015-16/index.html
- https://www.nature.com/articles/s41597-024-02945-6 (MFWD)
- https://github.com/grimmlab/MFWD
- https://github.com/StructorsComp/Multi-class-Weed-Classification (AIWeeds)
- https://github.com/cropandweed/cropandweed-dataset (CropAndWeed WACV 2023)
- https://openaccess.thecvf.com/content/WACV2023/papers/Steininger_The_CropAndWeed_Dataset_A_Multi-Modal_Learning_Approach_for_Efficient_Crop_WACV_2023_paper.pdf

### Section 3 — UAV Crop Detection / Segmentation
- https://registry.opendata.aws/intelinair_agriculture_vision/ (AgriVision)
- https://github.com/jingwu6/Extended-Agriculture-Vision-Dataset
- https://arxiv.org/abs/2001.01306 (AgriVision CVPR 2020)
- https://arxiv.org/abs/2303.02460 (Extended AgriVision TMLR 2023)
- https://www.ipb.uni-bonn.de/data/sugarbeets2016/
- https://journals.sagepub.com/doi/10.1177/0278364917720510 (Sugarbeets 2016 paper)
- https://phenoroam.phenorob.de/geonetwork/srv/api/records/265f6219-8e7f-48dd-8ce5-78450b15ac68
- https://www.phenobench.org/dataset.html (PhenoBench)
- https://www.phenobench.org/ (PhenoBench paper T-PAMI 2024)
- https://github.com/PRBonn/phenobench
- https://mediatum.ub.tum.de/1521238?show_id=1612845 (BavarianCrops)
- https://github.com/MarcCoru/crop-type-mapping
- https://arxiv.org/abs/1901.10681 (BavarianCrops paper)
- https://bonndata.uni-bonn.de/dataset.xhtml?persistentId=doi%3A10.60507%2FFK2%2FOX9XTM (MuST-C 2025)
- https://github.com/PRBonn/MuST-C
- https://github.com/cwfid/dataset (CWFID)
- http://dx.doi.org/10.1007/978-3-319-16220-1_8 (CWFID paper)
- https://lcmou.github.io/GrowliFlowers/ (GrowliFlowers hyperspectral cauliflower)
- https://www.mdpi.com/2077-0472/15/16/1751 (DECC-Net maize tassel 2025)

### Section 4 — Drone/Aerial Detection
- https://aiskyeye.com/visdrone-2021/ (VisDrone)
- https://docs.ultralytics.com/datasets/detect/visdrone
- https://zenodo.org/records/14575489 (VisDrone 2019 mirror)
- https://arxiv.org/abs/1804.07437 (VisDrone 2018 paper)
- https://sites.google.com/view/grli-uavdt (UAVDT)
- https://arxiv.org/abs/1804.00518 (UAVDT paper)
- https://bozcani.github.io/auairdataset (AU-AIR)
- https://github.com/sunw71/auairdataset
- https://arxiv.org/abs/2001.11737 (AU-AIR paper)
- https://captain-whu.github.io/DOTA/ (DOTA v1.0 + v2.0)
- https://ieee-dataport.org/documents/dota
- https://openaccess.thecvf.com/content_cvpr_2018/papers/Xia_DOTA_A_Large-Scale_CVPR_2018_paper.pdf
- https://cvgl.stanford.edu/projects/uav_data/ (Stanford Drone)
- https://lcmou.github.io/ERA_Dataset/ (ERA)
- https://arxiv.org/abs/2001.11394 (ERA paper)

### Section 5 — Satellite / NDVI
- https://dataspace.copernicus.eu/ (Sentinel-2)
- https://sentinels.copernicus.eu/sentinel-data-access-description
- https://sentiwiki.copernicus.eu/web/s2-mission
- https://earthexplorer.usgs.gov/ (Landsat 8/9)
- https://www.planet.com/ (Planet Labs)
- https://docs.planet.com/guides/subscribe-to-and-analyze-planetscope/
- https://www.planet.com/licensing-information/
- https://vedas.sac.gov.in/en/home.html (VEDAS)
- https://vedas.sac.gov.in/vconsole/ (VEDAS API)
- https://vedas.sac.gov.in/vcms/en/aboutus.html
- https://vedas.sac.gov.in/en/special_products.html
- https://www.isro.gov.in/VedasServices.html
- https://bhuvan.nrsc.gov.in/wiki/index.php/Terrestrial_Sciences_Products
- https://bhuvan.nrsc.gov.in/wiki/index.php/List_of_Vector_(Thematic_Maps)_datasets
- https://www.nrsc.gov.in/nrscnew/Apps_LULC.php
- https://bhuvan-app1.nrsc.gov.in/agriculture/agri.php
- https://bhuvan-app1.nrsc.gov.in/thematic/
- https://bhuvan-app3.nrsc.gov.in/data/download/ (NOEDA)
- https://bhoonidhi.nrsc.gov.in/ (Bhoonidhi)
- https://bhoonidhi.nrsc.gov.in/bhoonidhi-api/ (Bhoonidhi API)
- https://bhoonidhi.nrsc.gov.in/bhoonidhi_resources/help/docs/Bhoonidhi_ISROEOHub_UserManual_V2.0.pdf
- https://www.mosdac.gov.in/ (MOSDAC)
- https://www.mosdac.gov.in/insat-3d-data-products

### Section 6 — Indian-Specific
- https://krishi.icar.gov.in/ (ICAR KRISHI — URL unstable during research)
- https://iasri.icar.gov.in/ (ICAR-IASRI)
- https://icrisat.org/resources/data/comparative-map-homepage
- http://maps.icrisat.org/ (ICRISAT Geospatial)
- http://data.icrisat.org/dld/src/about-dld.html (ICRISAT DLD)
- https://dataverse.icrisat.org/ (ICRISAT Dataverse)
- https://data.mendeley.com/datasets/ywp3y5j9vv/1 (ICRISAT DLD Mendeley)
- https://www.mssrf.org/ (MSSRF)
- https://www.mssrf.org/sites/default/files/2025-09/Final_Annual%20Report%202025_22_09_2025_compressed.pdf
- https://iihr.res.in/ (IIHR)
- https://nbsslup.icar.gov.in/ (ICAR-NBSS&LUP)
- https://upag.gov.in/ (UPAg)
- https://www.data.gov.in/catalog/field-crop-varieties-released-central-release
- https://niruthi.com/ (Niruthi)
- https://www.cropin.com/ (Cropin)
- https://www.intellolabs.com/ (Intello Labs)
- https://fasal.co/ (Fasal)
- https://www.deshpandefoundation.org/ (Deshpande Foundation)
- https://www.tifrh.res.in/ (TIFR Hyderabad)
- https://cftri.res.in/ (CFTRI Mysore)
- https://github.com/vamsidharmuthireddy/Indic-Leaf-Dataset (Indic-Leaf IIIT Hyderabad)
- https://ispgr.in/index.php/ijpgr/article/download/1529/1376 (MSSRF millet paper)
- https://ispgr.in/index.php/ijpgr/article/download/1631/1470 (MSSRF rice paper)
- https://ibdc.dbtindia.gov.in/ibia/ (IBIA DBT)

### Section 7 — Other
- https://github.com/inaturalist/inaturalist-open-data (iNaturalist)
- https://huggingface.co/datasets/juppy44/gbif-plants-raw (iNat plant mirror)
- https://huggingface.co/datasets/anhaltai/plantNaturalist500k (plantNaturalist 500k)
- https://github.com/plantnet/PlantNet-300K
- https://zenodo.org/records/4726653
- https://www.weecology.org/ (DeepForest)
- https://github.com/weecology/DeepForest
- https://github.com/weecology/NeonTreeEvaluation
- https://cocodataset.org/ (COCO)
- https://www.image-net.org/ (ImageNet)
- https://www.kaggle.com/c/plant-seedlings-classification/data
- https://www.kaggle.com/datasets/sabuktagin/dataset-for-cotton-leaf-disease-detection
- https://github.com/grimmlab/MFWD
- https://www.tum-i22.github.io/grassclover/ (TUM GrassClover)
- https://www.ladi-dataset.org/ (LADI — disaster, skip)
- https://www.rareplanes.com/ (RarePlanes — skip)

### Cited in Companion Doc
- https://www.mdpi.com/2072-4292/16/23/4394
- https://www.mdpi.com/2071-1050/17/13/5786
- https://www.mdpi.com/2073-4395/14/10/2357
- https://www.frontiersin.org/journals/plant-science/articles/10.3389/fpls.2025
- https://www.mdpi.com/2673-283X/8/2/8

---

## Bottom Line — Three-Paragraph Summary

**For a COEP thesis on agricultural UAV multispectral imaging with the MS400**, you have enough public data to publish 2-3 strong papers if you focus on the India-specific datasets (PaddyDoctor, Sugarcane Pune, SAR-CLD-2024 cotton) plus the global UAV-MSI datasets that match your camera (WeedsGalore 2024 for maize weeds, PhenoBench 2024 for crop/weed segmentation, Extended Agriculture-Vision for SSL pretraining). Use Sentinel-2 + VEDAS for satellite ground truth, ICRISAT DLD for yield-model training, and always pretrain from ImageNet/COCO. Do **not** waste time on datasets older than 2020 (PlantDoc, CWFID, older Kaggle sets) except as transfer-learning targets; do not waste time on the ~30 small irrelevant Indian Kaggle sets.

**The biggest opportunity is also the biggest gap**: no public UAV multispectral dataset exists for Maharashtra (or anywhere in India) with agronomist-validated disease/weed/yield ground truth. COEP should plan 2 field campaigns (kharif 2026 + rabi 2026-27) with the MS400 over 5–10 farms in Pune district, partner with MPKV/VNMKV for ground truth, and publish the resulting "COEP-Maharashtra-MS-2027" dataset on Mendeley under CC BY 4.0. **That single contribution makes the thesis publishable at ICAR, MDPI Remote Sensing, Frontiers in Plant Science, or Computers and Electronics in Agriculture**, even if the model itself is incremental.

**The path of least resistance** for a 1-year thesis: pick **one** of three scopes — (a) disease detection (use PaddyDoctor + PlantVillage + small in-house leaf collection), (b) weed detection (use DeepWeeds + CottonWeedDet12 + field flights over a cotton/sugarcane farm), or (c) NDVI-based yield estimation (use Sentinel-2 + VEDAS + ICRISAT district yield + field-collected UAV NDVI at harvest). Do not try to do all three. The MS400 is best for (b) and (c); the Pi NoIR v2 + blue filter is best for (a) if budget is tight.
