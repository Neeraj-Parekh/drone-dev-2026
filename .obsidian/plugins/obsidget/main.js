"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => WidgetPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");

// i18n.ts
var I18N_DICT = {
  en: {
    galleryTitle: "\u{1F9E9} Widget Gallery",
    searchPlaceholder: "Search widgets...",
    allTags: "All Tags",
    addWidget: "Add Widget",
    insert: "Insert",
    edit: "Edit",
    delete: "Delete",
    previous: "Previous",
    next: "Next",
    pageInfo: "Page {0} of {1}",
    noResults: "No widgets found matching your search.",
    deleteConfirm: "Are you sure you want to delete this widget?",
    widgetDeleted: "Widget deleted.",
    widgetSaved: "Widget saved.",
    widgetName: "Widget Name",
    widgetId: "Widget ID (filename)",
    widgetTags: "Widget Tags (comma separated)",
    htmlContent: "HTML Content",
    cssContent: "CSS Content",
    jsContent: "JS Content",
    saveWidget: "Save Widget",
    cancel: "Cancel",
    createWidget: "Create Widget",
    editWidget: "Edit {0}",
    loadedMsg: "\u2705 {0} widgets and {1} tags loaded",
    loadedNoTagsMsg: "\u2705 {0} widgets loaded (no tags)",
    noTagsFound: "No tags found in widgets.",
    settingsGalleryPath: "Gallery Directory Path",
    settingsGalleryPathDesc: "Path to the folder where widget TS/TSX files are stored.",
    settingsLanguage: "Language",
    settingsLanguageDesc: "Select the plugin language.",
    saveToGallery: "Save to Gallery",
    settingsTitle: "Widget CSS Settings",
    insertError: "Open a note to insert the widget.",
    insertWidgetMenu: "Insert Widget",
    settingsGithub: "GitHub Repository",
    settingsGithubDesc: "Visit the project on GitHub for updates and contributions.",
    syncGalleryBtn: "Update Gallery",
    syncGalleryDesc: "Download new widgets from the community gallery (won't overwrite your existing widgets).",
    syncSuccess: "\u2705 Gallery updated! {0} new widgets added.",
    syncError: "\u274C Error updating gallery: {0}",
    updateAllWidgets: "Update All Widgets in Vault",
    updateAllWidgetsDesc: "Update the code of all widgets in your notes with the latest version from the gallery (preserves your data).",
    updateAllWidgetsBtn: "Update All",
    updateAllWidgetsSuccess: "\u2705 Updated {0} widgets in {1} files.",
    updateAllWidgetsNoWidgets: "No widgets found to update.",
    updateAllWidgetsError: "\u274C Error updating widgets: {0}",
    settingsMaxWidth: "Max Widget Width",
    settingsMaxWidthDesc: "Limit the width of widgets when 'Readable line length' is disabled. Choose between percentage or fixed pixels.",
    widgetDescription: "Description",
    widgetDescriptionDesc: "Describe what this widget does",
    widgetAuthor: "Author",
    widgetAuthorDesc: "Your name or username",
    widgetAuthorUrl: "Author URL",
    widgetAuthorUrlDesc: "Link to your GitHub profile (optional)",
    updatePlugin: "Update Plugin",
    updatePluginDesc: "Update the plugin to the latest version from GitHub.",
    updatePluginBtn: "Build Update",
    updatePluginCommand: "Update Plugin from GitHub",
    tabCode: "Code",
    tabVisual: "Visual Style",
    livePreview: "Live Preview",
    visualEditor: "Visual Editor",
    detectedVariables: "Detected CSS Variables",
    insertFullCode: "Insert Full Code (Local)",
    settingsShowDataFiles: "Show Data Files (CSV, JSON, XML)",
    settingsShowDataFilesDesc: "Show these file types in the Obsidian file explorer. Requires reload.",
    sortBy: "Sort by",
    sortByLastModified: "Last Modified",
    sortByCreated: "Created Date",
    sortByName: "Name (A-Z)",
    checkForUpdates: "Check for Updates",
    checkForUpdatesDesc: "Check if a new version of the plugin is available on GitHub.",
    checkingForUpdates: "Checking for updates...",
    pluginUpToDate: "Plugin is up to date (v{0}).",
    updateAvailable: "Update available: v{0}. Current: v{1}.",
    updateNow: "Update Now"
  },
  fr: {
    galleryTitle: "\u{1F9E9} Galerie de Widgets",
    searchPlaceholder: "Rechercher des widgets...",
    allTags: "Tous les tags",
    addWidget: "Ajouter un widget",
    insert: "Ins\xE9rer",
    edit: "Modifier",
    delete: "Supprimer",
    previous: "Pr\xE9c\xE9dent",
    next: "Suivant",
    pageInfo: "Page {0} sur {1}",
    noResults: "Aucun widget trouv\xE9 pour votre recherche.",
    deleteConfirm: "\xCAtes-vous s\xFBr de vouloir supprimer ce widget ?",
    widgetDeleted: "Widget supprim\xE9.",
    widgetSaved: "Widget enregistr\xE9.",
    widgetName: "Nom du widget",
    widgetId: "ID du widget (nom du fichier)",
    widgetTags: "Tags du widget (s\xE9par\xE9s par des virgules)",
    htmlContent: "Contenu HTML",
    cssContent: "Contenu CSS",
    jsContent: "Contenu JS",
    saveWidget: "Enregistrer le widget",
    cancel: "Annuler",
    createWidget: "Cr\xE9er un widget",
    editWidget: "Modifier {0}",
    loadedMsg: "\u2705 {0} widgets et {1} tags charg\xE9s",
    loadedNoTagsMsg: "\u2705 {0} widgets charg\xE9s (aucun tag)",
    noTagsFound: "Aucun tag trouv\xE9 dans les widgets.",
    settingsGalleryPath: "Chemin du r\xE9pertoire de la galerie",
    settingsGalleryPathDesc: "Chemin vers le dossier o\xF9 sont stock\xE9s les fichiers TS/TSX des widgets.",
    settingsLanguage: "Langue",
    settingsLanguageDesc: "S\xE9lectionnez la langue du plugin.",
    saveToGallery: "Enregistrer dans la galerie",
    settingsTitle: "Param\xE8tres Widget CSS",
    insertError: "Ouvrez une note pour ins\xE9rer le widget.",
    insertWidgetMenu: "Ins\xE9rer un widget",
    settingsGithub: "D\xE9p\xF4t GitHub",
    settingsGithubDesc: "Visitez le projet sur GitHub pour les mises \xE0 jour et les contributions.",
    syncGalleryBtn: "Mettre \xE0 jour la galerie",
    syncGalleryDesc: "T\xE9l\xE9chargez les nouveaux widgets de la galerie communautaire (n'\xE9crase pas vos widgets existants).",
    syncSuccess: "\u2705 Galerie mise \xE0 jour ! {0} nouveaux widgets ajout\xE9s.",
    syncError: "\u274C Erreur lors de la mise \xE0 jour : {0}",
    updateAllWidgets: "Mettre \xE0 jour tous les widgets du coffre",
    updateAllWidgetsDesc: "Met \xE0 jour le code de tous les widgets dans vos notes avec la derni\xE8re version de la galerie (pr\xE9serve vos donn\xE9es).",
    updateAllWidgetsBtn: "Tout mettre \xE0 jour",
    updateAllWidgetsSuccess: "\u2705 {0} widgets mis \xE0 jour dans {1} fichiers.",
    updateAllWidgetsNoWidgets: "Aucun widget \xE0 mettre \xE0 jour trouv\xE9.",
    updateAllWidgetsError: "\u274C Erreur lors de la mise \xE0 jour des widgets : {0}",
    settingsMaxWidth: "Largeur maximale des widgets",
    settingsMaxWidthDesc: "Limite la largeur des widgets quand 'Longueur de ligne lisible' est d\xE9sactiv\xE9e. Choisissez entre pourcentage ou pixels fixes.",
    widgetDescription: "Description",
    widgetDescriptionDesc: "D\xE9crivez ce que fait ce widget",
    widgetAuthor: "Auteur",
    widgetAuthorDesc: "Votre nom ou pseudo",
    widgetAuthorUrl: "URL de l'auteur",
    widgetAuthorUrlDesc: "Lien vers votre profil GitHub (optionnel)",
    updatePlugin: "Mettre \xE0 jour le plugin",
    updatePluginDesc: "Mettre \xE0 jour le plugin vers la derni\xE8re version depuis GitHub.",
    updatePluginBtn: "Mettre \xE0 jour (Build)",
    updatePluginCommand: "Mettre \xE0 jour le plugin depuis GitHub",
    tabCode: "Code",
    tabVisual: "Style Visuel",
    livePreview: "Aper\xE7u en direct",
    visualEditor: "\xC9diteur Visuel",
    detectedVariables: "Variables CSS d\xE9tect\xE9es",
    insertFullCode: "Ins\xE9rer le code complet (Local)",
    settingsShowDataFiles: "Afficher les fichiers de donn\xE9es (CSV, JSON, XML)",
    settingsShowDataFilesDesc: "Afficher ces types de fichiers dans l'explorateur de fichiers Obsidian. N\xE9cessite un red\xE9marrage.",
    sortBy: "Trier par",
    sortByLastModified: "Derni\xE8re modification",
    sortByCreated: "Date de cr\xE9ation",
    sortByName: "Nom (A-Z)",
    checkForUpdates: "V\xE9rifier les mises \xE0 jour",
    checkForUpdatesDesc: "V\xE9rifier si une nouvelle version du plugin est disponible sur GitHub.",
    checkingForUpdates: "Recherche de mises \xE0 jour...",
    pluginUpToDate: "Le plugin est \xE0 jour (v{0}).",
    updateAvailable: "Mise \xE0 jour disponible : v{0}. Actuelle : v{1}.",
    updateNow: "Mettre \xE0 jour maintenant"
  },
  es: { galleryTitle: "\u{1F9E9} Galer\xEDa de Widgets", searchPlaceholder: "Buscar widgets...", allTags: "Todas las etiquetas", addWidget: "A\xF1adir widget", insert: "Insertar", edit: "Editar", delete: "Eliminar", previous: "Anterior", next: "Siguiente", pageInfo: "P\xE1gina {0} de {1}", noResults: "No se encontraron widgets que coincidan con su b\xFAsqueda.", deleteConfirm: "\xBFEst\xE1s seguro de que quieres eliminar este widget?", widgetDeleted: "Widget eliminado.", widgetSaved: "Widget guardado.", widgetName: "Nombre del widget", widgetId: "ID del widget (nombre de archivo)", widgetTags: "Etiquetas del widget (separadas por comas)", htmlContent: "Contenido HTML", cssContent: "Contenido CSS", jsContent: "Contenido JS", saveWidget: "Guardar widget", cancel: "Cancelar", createWidget: "Crear widget", editWidget: "Editar {0}", loadedMsg: "\u2705 {0} widgets y {1} etiquetas cargados", loadedNoTagsMsg: "\u2705 {0} widgets charg\xE9s (sin etiquetas)", noTagsFound: "No se encontraron etiquetas en los widgets.", settingsGalleryPath: "Ruta del directorio de la galer\xEDa", settingsGalleryPathDesc: "Ruta a la carpeta donde se almacenan los archivos TS/TSX de los widgets.", settingsLanguage: "Idioma", settingsLanguageDesc: "Seleccione el idioma del plugin.", saveToGallery: "Guardar en la galer\xEDa", settingsTitle: "Ajustes de Widget CSS", insertError: "Abra una nota para insertar le widget.", insertWidgetMenu: "Insertar widget", settingsGithub: "Repositorio GitHub", settingsGithubDesc: "Visite el proyecto en GitHub para actualizaciones y contribuciones.", syncGalleryBtn: "Actualizar galer\xEDa", syncGalleryDesc: "Descarga nuevos widgets de la galerie communautaire (no sobrescribir\xE1 tus widgets existantes).", syncSuccess: "\u2705 \xA1Galer\xEDa actualizada! {0} nuevos widgets a\xF1adidos.", syncError: "\u274C Error al actualizar la galer\xEDa: {0}", updateAllWidgets: "Actualizar todos los widgets en la b\xF3veda", updateAllWidgetsDesc: "Actualiza el c\xF3digo de todos los widgets en tus notas con la \xFAltima versi\xF3n de la galer\xEDa (preserva tus datos).", updateAllWidgetsBtn: "Actualizar todo", updateAllWidgetsSuccess: "\u2705 Se actualizaron {0} widgets en {1} archivos.", updateAllWidgetsNoWidgets: "No se encontraron widgets para actualizar.", updateAllWidgetsError: "\u274C Error al actualizar los widgets: {0}", settingsMaxWidth: "Ancho m\xE1ximo del widget", settingsMaxWidthDesc: "Limite el ancho de los widgets cuando 'Longitud de l\xEDnea legible' est\xE1 desactivada. Elija entre porcentaje o p\xEDxeles fijos.", widgetDescription: "Descripci\xF3n", widgetDescriptionDesc: "Describe lo que hace este widget", widgetAuthor: "Autor", widgetAuthorDesc: "Tu nombre o apodo", widgetAuthorUrl: "URL del autor", widgetAuthorUrlDesc: "Enlace a tu perfil de GitHub (opcional)", updatePlugin: "Actualizar plugin", updatePluginDesc: "Actualiza el plugin a la \xFAltima versi\xF3n desde GitHub.", updatePluginBtn: "Actualizar (Build)", updatePluginCommand: "Actualizar plugin desde GitHub", tabCode: "Code", tabVisual: "Visual Style", livePreview: "Live Preview", visualEditor: "Visual Editor", detectedVariables: "Detected CSS Variables", insertFullCode: "Insertar c\xF3digo completo (Local)", settingsShowDataFiles: "Mostrar archivos de datos (CSV, JSON, XML)", settingsShowDataFilesDesc: "Mostrar estos tipos de archivos en el explorador de archivos de Obsidian. Requiere recargar.", sortBy: "Ordenar por", sortByLastModified: "\xDAltima modificaci\xF3n", sortByCreated: "Fecha de creaci\xF3n", sortByName: "Nombre (A-Z)", checkForUpdates: "Buscar actualizaciones", checkForUpdatesDesc: "Compruebe si hay una nueva versi\xF3n del plugin disponible en GitHub.", checkingForUpdates: "Buscando actualizaciones...", pluginUpToDate: "El plugin est\xE1 actualizado (v{0}).", updateAvailable: "Actualizaci\xF3n disponible: v{0}. Actual: v{1}.", updateNow: "Actualizar ahora" },
  de: { galleryTitle: "\u{1F9E9} Widget-Galerie", searchPlaceholder: "Widgets suchen...", allTags: "Alle Tags", addWidget: "Widget hinzuf\xFCgen", insert: "Einf\xFCgen", edit: "Bearbeiten", delete: "L\xF6schen", previous: "Zur\xFCck", next: "Weiter", pageInfo: "Seite {0} von {1}", noResults: "Keine Widgets gefunden, die Ihrer Suche entsprechen.", deleteConfirm: "Sind Sie sicher, dass Sie dieses Widget l\xF6schen m\xF6chten?", widgetDeleted: "Widget gel\xF6scht.", widgetSaved: "Widget gespeichert.", widgetName: "Widget-Name", widgetId: "Widget-ID (Dateiname)", widgetTags: "Widget-Tags (kommagetrennt)", htmlContent: "HTML-Inhalt", cssContent: "CSS-Inhalt", jsContent: "JS-Inhalt", saveWidget: "Widget speichern", cancel: "Abbrechen", createWidget: "Widget erstellen", editWidget: "{0} bearbeiten", loadedMsg: "\u2705 {0} Widgets und {1} Tags geladen", loadedNoTagsMsg: "\u2705 {0} Widgets geladen (keine Tags)", noTagsFound: "Keine Tags in den Widgets gefunden.", settingsGalleryPath: "Galerieverzeichnis-Pfad", settingsGalleryPathDesc: "Pfad zum Ordner, in dem die Widget-TS/TSX-Dateien gespeichert sind.", settingsLanguage: "Sprache", settingsLanguageDesc: "W\xE4hlen Sie die Sprache des Plugins aus.", saveToGallery: "In Galerie speichern", settingsTitle: "Widget CSS Einstellungen", insertError: "\xD6ffnen Sie eine Notiz, um das Widget einzuf\xFCgen.", insertWidgetMenu: "Widget einf\xFCgen", settingsGithub: "GitHub-Repository", settingsGithubDesc: "Besuchen Sie das Projekt auf GitHub f\xFCr Updates und Beitr\xE4ge.", syncGalleryBtn: "Galerie aktualisieren", syncGalleryDesc: "Laden Sie neue Widgets aus der Community-Galerie herunter (Ihre vorhandenen Widgets werden nicht \xFCberschrieben).", syncSuccess: "\u2705 Galerie aktualisiert! {0} neue Widgets hinzugef\xFCgt.", syncError: "\u274C Fehler beim Aktualisieren der Galerie: {0}", updateAllWidgets: "Alle Widgets im Vault aktualisieren", updateAllWidgetsDesc: "Aktualisiert den Code aller Widgets in Ihren Notizen with der neuesten Version aus der Galerie (Ihre Daten bleiben erhalten).", updateAllWidgetsBtn: "Alle aktualisieren", updateAllWidgetsSuccess: "\u2705 {0} Widgets in {1} Dateien aktualisiert.", updateAllWidgetsNoWidgets: "Keine zu aktualisierenden Widgets gefunden.", updateAllWidgetsError: "\u274C Fehler beim Aktualisieren der Widgets: {0}", settingsMaxWidth: "Maximale Widget-Breite", settingsMaxWidthDesc: "Begrenzt die Breite von Widgets, wenn 'Lesbare Zeilenl\xE4nge' deaktiviert ist. W\xE4hlen Sie zwischen Prozentsatz oder festen Pixeln.", widgetDescription: "Beschreibung", widgetDescriptionDesc: "Beschreiben Sie, was dieses Widget macht", widgetAuthor: "Autor", widgetAuthorDesc: "Ihr Name oder Benutzername", widgetAuthorUrl: "Autor-URL", widgetAuthorUrlDesc: "Link zu Ihrem GitHub-Profil (optional)", updatePlugin: "Plugin aktualisieren", updatePluginDesc: "Aktualisieren Sie das Plugin auf die neueste Version von GitHub.", updatePluginBtn: "Update (Build)", updatePluginCommand: "Plugin von GitHub aktualisieren", tabCode: "Code", tabVisual: "Visual Style", livePreview: "Live Preview", visualEditor: "Visual Editor", detectedVariables: "Detected CSS Variables", insertFullCode: "Vollst\xE4ndigen Code einf\xFCgen (Lokal)", settingsShowDataFiles: "Datendateien anzeigen (CSV, JSON, XML)", settingsShowDataFilesDesc: "Diese Dateitypen im Obsidian-Dateiexplorer anzeigen. Erfordert Neustart.", sortBy: "Sortieren nach", sortByLastModified: "Zuletzt ge\xE4ndert", sortByCreated: "Erstellungsdatum", sortByName: "Name (A-Z)", checkForUpdates: "Nach Updates suchen", checkForUpdatesDesc: "Pr\xFCfen Sie, ob eine neue Version des Plugins auf GitHub verf\xFCgbar ist.", checkingForUpdates: "Suche nach Updates...", pluginUpToDate: "Plugin ist auf dem neuesten Stand (v{0}).", updateAvailable: "Update verf\xFCgbar: v{0}. Aktuell: v{1}.", updateNow: "Jetzt aktualisieren" },
  pt: { galleryTitle: "\u{1F9E9} Galeria de Widgets", searchPlaceholder: "Pesquisar widgets...", allTags: "Todas as etiquetas", addWidget: "Adicionar Widget", insert: "Inserir", edit: "Editar", delete: "Excluir", previous: "Anterior", next: "Pr\xF3ximo", pageInfo: "P\xE1gina {0} de {1}", noResults: "Nenhum widget encontrado correspondente \xE0 sua pesquisa.", deleteConfirm: "Tem certeza de que deseja excluir este widget?", widgetDeleted: "Widget exclu\xEDdo.", widgetSaved: "Widget salvo.", widgetName: "Nome do Widget", widgetId: "ID do Widget (nome do arquivo)", widgetTags: "Etiquetas do Widget (separadas por v\xEDrgulas)", htmlContent: "Conte\xFAdo HTML", cssContent: "Conte\xFAdo CSS", jsContent: "Conte\xFAdo JS", saveWidget: "Salvar Widget", cancel: "Cancelar", createWidget: "Criar Widget", editWidget: "Editar {0}", loadedMsg: "\u2705 {0} widgets e {1} etiquetas carregados", loadedNoTagsMsg: "\u2705 {0} widgets carregados (sem etiquetas)", noTagsFound: "Nenhuma etiqueta encontrada nos widgets.", settingsGalleryPath: "Caminho do diret\xF3rio da galeria", settingsGalleryPathDesc: "Caminho para a pasta onde os ficheiros TS/TSX do widget s\xE3o armazenados.", settingsLanguage: "Idioma", settingsLanguageDesc: "Selecione o idioma do plugin.", saveToGallery: "Salvar na galeria", settingsTitle: "Configura\xE7\xF5es do Widget CSS", insertError: "Abra une nota para inserir le widget.", insertWidgetMenu: "Inserir Widget", settingsGithub: "Reposit\xF3rio GitHub", settingsGithubDesc: "Visite o projeto no GitHub para atualiza\xE7\xF5es e contribui\xE7\xF5es.", syncGalleryBtn: "Atualizar Galeria", syncGalleryDesc: "Baixe novos widgets da galeria da comunidade (n\xE3o substituir\xE1 seus widgets existentes).", syncSuccess: "\u2705 Galeria atualizada! {0} novos widgets adicionados.", syncError: "\u274C Erro ao atualizar a galeria: {0}", updateAllWidgets: "Atualizar todos os widgets no cofre", updateAllWidgetsDesc: "Atualiza o c\xF3digo de todos os widgets em suas notas com a vers\xE3o mais recente da galeria (preserva seus donn\xE9es).", updateAllWidgetsBtn: "Atualizar tudo", updateAllWidgetsSuccess: "\u2705 {0} widgets atualizados em {1} arquivos.", updateAllWidgetsNoWidgets: "Nenhum widget encontrado para atualizar.", updateAllWidgetsError: "\u274C Erro ao atualizar widgets: {0}", settingsMaxWidth: "Largura M\xE1xima do Widget", settingsMaxWidthDesc: "Limite a largura dos widgets quando 'Comprimento de linha leg\xEDvel' estiver desativado. Escolha entre porcentagem ou pixels fixos.", widgetDescription: "Descri\xE7\xE3o", widgetDescriptionDesc: "Descreva o que este widget faz", widgetAuthor: "Autor", widgetAuthorDesc: "Seu nome ou apelido", widgetAuthorUrl: "URL do autor", widgetAuthorUrlDesc: "Link para seu perfil do GitHub (opcional)", updatePlugin: "Atualizar Plugin", updatePluginDesc: "Atualize o plugin para a vers\xE3o mais recente do GitHub.", updatePluginBtn: "Atualizar (Build)", updatePluginCommand: "Atualizar plugin do GitHub", tabCode: "Code", tabVisual: "Visual Style", livePreview: "Live Preview", visualEditor: "Visual Editor", detectedVariables: "Detected CSS Variables", insertFullCode: "Inserir c\xF3digo completo (Local)", settingsShowDataFiles: "Mostrar arquivos de dados (CSV, JSON, XML)", settingsShowDataFilesDesc: "Mostrar esses tipos de arquivos no explorador de arquivos do Obsidian. Requer recarregamento.", sortBy: "Ordenar por", sortByLastModified: "\xDAltima modifica\xE7\xE3o", sortByCreated: "Data de cria\xE7\xE3o", sortByName: "Nome (A-Z)", checkForUpdates: "Verificar atualiza\xE7\xF5es", checkForUpdatesDesc: "Verifique se uma nova vers\xE3o do plugin est\xE1 dispon\xEDvel no GitHub.", checkingForUpdates: "Verificando atualiza\xE7\xF5es...", pluginUpToDate: "O plugin est\xE1 atualizado (v{0}).", updateAvailable: "Atualiza\xE7\xE3o dispon\xEDvel: v{0}. Atual: v{1}.", updateNow: "Atualizar agora" }
};

// main.ts
var DEFAULT_SETTINGS = {
  galleryPath: ".obsidian/plugins/obsidian-obsidget/gallery",
  language: "en",
  githubUrl: "https://github.com/infinition/obsidian-obsidget",
  maxWidthValue: 100,
  maxWidthUnit: "percent",
  firstRun: true,
  showDataFiles: false
};
var WidgetPlugin = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.templateCache = /* @__PURE__ */ new Map();
  }
  t(key, ...args) {
    const lang = this.settings.language || "en";
    let text = I18N_DICT[lang][key] || I18N_DICT["en"][key] || key;
    args.forEach((arg, i) => {
      text = text.replace(`{${i}}`, String(arg));
    });
    return text;
  }
  /**
   * Split content on delimiter lines (---) that are on their own line
   * This prevents splitting on --- that appears inside JSON or other content
   */
  splitOnDelimiters(content, maxSplits = 3) {
    const lines = content.split("\n");
    const sections = [];
    let currentSection = [];
    let splitCount = 0;
    for (const line of lines) {
      if (line.trim() === "---" && splitCount < maxSplits) {
        sections.push(currentSection.join("\n"));
        currentSection = [];
        splitCount++;
      } else {
        currentSection.push(line);
      }
    }
    sections.push(currentSection.join("\n"));
    return sections;
  }
  /** Parse "export default { ... };" from .ts/.tsx content (JSON object). */
  parseTsTsxExport(content) {
    const idx = content.indexOf("export default");
    if (idx === -1) return null;
    const start = content.indexOf("{", idx);
    if (start === -1) return null;
    let depth = 1;
    let i = start + 1;
    while (i < content.length && depth > 0) {
      const c = content[i];
      if (c === "\\") {
        i += 2;
        continue;
      }
      if (c === "`") {
        i++;
        while (i < content.length) {
          if (content[i] === "\\") {
            i += 2;
            continue;
          }
          if (content[i] === "`") break;
          i++;
        }
        i++;
        continue;
      }
      if (c === '"' || c === "'") {
        const q = c;
        i++;
        while (i < content.length) {
          if (content[i] === "\\") {
            i += 2;
            continue;
          }
          if (content[i] === q) break;
          i++;
        }
        i++;
        continue;
      }
      if (c === "{") depth++;
      else if (c === "}") depth--;
      i++;
    }
    if (depth !== 0) return null;
    try {
      const raw = content.slice(start, i);
      const noTemplates = this.templateLiteralsToJsonStrings(raw);
      const jsonSafe = this.escapeNewlinesInJsonStrings(noTemplates);
      return JSON.parse(jsonSafe);
    } catch (e) {
      console.error("ObsidGet parseTsTsxExport failed:", e);
      return null;
    }
  }
  /** Convert template literals (backticks) to double-quoted JSON strings so JSON.parse() accepts the object. */
  templateLiteralsToJsonStrings(raw) {
    const isSpace = (ch) => ch === " " || ch === "	" || ch === "\n" || ch === "\r";
    let out = "";
    let i = 0;
    while (i < raw.length) {
      if (raw[i] === "`") {
        let j = i - 1;
        while (j >= 0 && isSpace(raw[j])) j--;
        if (j >= 0 && raw[j] === ":") {
          j--;
          while (j >= 0 && isSpace(raw[j])) j--;
          if (j >= 0 && raw[j] === '"') {
            out += '"';
            i++;
            while (i < raw.length) {
              const d = raw[i];
              if (d === "\\") {
                const next = raw[i + 1] ?? "";
                if (next === '"') {
                  out += '\\"';
                  i += 2;
                  continue;
                }
                if (next === "`" || next === "\\") {
                  out += "\\\\" + next;
                  i += 2;
                  continue;
                }
                out += "\\\\";
                out += next;
                i += 2;
                continue;
              }
              if (d === "`") break;
              if (d === '"') {
                out += '\\"';
                i++;
                continue;
              }
              if (d === "\r" && raw[i + 1] === "\n") {
                out += "\\n";
                i += 2;
                continue;
              }
              if (d === "\n" || d === "\r") {
                out += "\\n";
                i++;
                continue;
              }
              out += d;
              i++;
            }
            out += '"';
            i++;
            continue;
          }
        }
      }
      out += raw[i];
      i++;
    }
    return out;
  }
  /** Replace literal newlines inside double-quoted strings with \\n so JSON.parse() accepts the object. */
  escapeNewlinesInJsonStrings(raw) {
    let out = "";
    let i = 0;
    while (i < raw.length) {
      const c = raw[i];
      if (c === '"') {
        out += c;
        i++;
        while (i < raw.length) {
          const d = raw[i];
          if (d === "\\") {
            out += raw[i];
            out += raw[i + 1] ?? "";
            i += 2;
            continue;
          }
          if (d === '"') break;
          if (d === "\r" && raw[i + 1] === "\n") {
            out += "\\n";
            i += 2;
            continue;
          }
          if (d === "\n" || d === "\r") {
            out += "\\n";
            i++;
            continue;
          }
          out += d;
          i++;
        }
        if (i < raw.length) out += raw[i++];
        continue;
      }
      out += c;
      i++;
    }
    return out;
  }
  /** Get gallery file path for widget id (.tsx preferred, then .ts). */
  async getGalleryFilePath(id) {
    const base = (0, import_obsidian.normalizePath)(`${this.settings.galleryPath}/${id}`);
    if (await this.app.vault.adapter.exists(base + ".tsx")) return base + ".tsx";
    if (await this.app.vault.adapter.exists(base + ".ts")) return base + ".ts";
    return null;
  }
  /** Load template from gallery by id (reads .tsx or .ts and parses export default). */
  async loadTemplateFromGallery(widgetId) {
    const path = await this.getGalleryFilePath(widgetId);
    if (!path) return null;
    try {
      const content = await this.app.vault.adapter.read(path);
      return this.parseTsTsxExport(content);
    } catch (e) {
      console.error(`Error loading widget "${widgetId}":`, e);
      return null;
    }
  }
  async onload() {
    await this.loadSettings();
    if (this.settings.showDataFiles) {
      this.registerExtensions(["json", "csv", "xml"], "markdown");
    }
    this.checkForUpdates(true);
    await this.ensureDirectory(this.settings.galleryPath);
    this.app.workspace.onLayoutReady(async () => {
      console.log("ObsidGet: Checking first run status...", this.settings.firstRun);
      if (this.settings.firstRun) {
        console.log("ObsidGet: First run detected, starting sync...");
        new import_obsidian.Notice("ObsidGet: First installation detected. Downloading widgets...");
        this.settings.firstRun = false;
        await this.saveSettings();
        await this.syncGallery();
      }
    });
    this.addSettingTab(new WidgetSettingTab(this.app, this));
    this.addRibbonIcon("layout", this.t("galleryTitle"), () => {
      new WidgetGalleryModal(this.app, this).open();
    });
    this.addCommand({
      id: "open-widget-gallery",
      name: this.t("galleryTitle"),
      callback: () => {
        new WidgetGalleryModal(this.app, this).open();
      }
    });
    this.addCommand({
      id: "refresh-all-widgets",
      name: "Refresh All Widgets",
      callback: () => {
        const view = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
        if (view) {
          view.previewMode?.rerender(true);
          new import_obsidian.Notice("Refreshing all widgets...");
        }
      }
    });
    this.addCommand({
      id: "update-plugin",
      name: this.t("updatePluginCommand"),
      callback: () => {
        this.updatePlugin();
      }
    });
    this.registerEvent(
      this.app.workspace.on("editor-menu", (menu, editor, view) => {
        menu.addItem((item) => {
          item.setTitle(this.t("insertWidgetMenu")).setIcon("zap").setSection("insert").onClick(async () => {
            new WidgetGalleryModal(this.app, this, editor).open();
          });
        });
      })
    );
    this.registerEvent(
      this.app.workspace.on("active-leaf-change", (leaf) => {
        if (leaf?.view instanceof import_obsidian.MarkdownView) {
          leaf.view.previewMode?.rerender(true);
        }
      })
    );
    this.registerMarkdownCodeBlockProcessor("widget", async (source, el, ctx) => {
      const sections = this.splitOnDelimiters(source, 3);
      let firstSection = sections[0].trim();
      let widgetId = "";
      let htmlContent = "";
      let cssContent = sections[1] || "";
      let jsContent = sections[2] || "";
      let inlineDataStr = sections[3]?.trim();
      let isLinked = false;
      const sanitizeId = (id) => id.replace(/[^a-zA-Z0-9_-]/g, "");
      if (firstSection.startsWith("ID:")) {
        const lines = firstSection.split("\n");
        widgetId = sanitizeId(lines[0].replace("ID:", "").trim());
        htmlContent = lines.slice(1).join("\n").trim();
      } else {
        htmlContent = firstSection;
      }
      if (!htmlContent.trim() && widgetId) {
        isLinked = true;
        let template = this.templateCache.get(widgetId);
        if (!template) {
          template = await this.loadTemplateFromGallery(widgetId);
          if (template) this.templateCache.set(widgetId, template);
        }
        if (template) {
          if (!htmlContent.trim()) htmlContent = template.html || "";
          if (!cssContent.trim()) cssContent = template.css || "";
          if (!jsContent.trim()) jsContent = template.js || "";
        } else {
          htmlContent = `<div class="mod-warning">Widget "${widgetId}" not found in gallery.</div>`;
        }
      }
      if (isLinked && !htmlContent) {
        el.innerHTML = '<div class="widget-loading">Loading widget...</div>';
      }
      const sectionInfo = ctx.getSectionInfo(el);
      const lineStart = sectionInfo?.lineStart || 0;
      const filePath = ctx.sourcePath;
      const instanceId = widgetId || `${filePath.replace(/\//g, "_")}__line${lineStart}`;
      const container = el.createDiv({ cls: "widget-instance-container" });
      container.addEventListener("dblclick", (e) => {
        e.stopPropagation();
      });
      const { maxWidthValue, maxWidthUnit } = this.settings;
      if (maxWidthUnit === "percent" && maxWidthValue < 100) {
        container.style.maxWidth = `${maxWidthValue}%`;
        container.style.marginLeft = "auto";
        container.style.marginRight = "auto";
      } else if (maxWidthUnit === "pixel") {
        container.style.maxWidth = `${maxWidthValue}px`;
        container.style.marginLeft = "auto";
        container.style.marginRight = "auto";
      }
      const btnContainer = container.createDiv({ cls: "widget-action-buttons" });
      btnContainer.style.position = "absolute";
      btnContainer.style.top = "10px";
      btnContainer.style.left = "50%";
      btnContainer.style.transform = "translateX(-50%)";
      btnContainer.style.display = "flex";
      btnContainer.style.gap = "5px";
      btnContainer.style.zIndex = "100";
      const createBtn = (text, title, onClick) => {
        const btn = btnContainer.createEl("button", { text, cls: "widget-save-to-gallery-btn" });
        btn.title = title;
        btn.onclick = (e) => {
          e.stopPropagation();
          onClick(e);
        };
        return btn;
      };
      if (isLinked) {
        createBtn("\u270F\uFE0F", "Edit this widget in gallery", async () => {
          let template = this.templateCache.get(widgetId);
          if (!template || !template.css || !template.js) {
            template = await this.loadTemplateFromGallery(widgetId) ?? void 0;
            if (template) this.templateCache.set(widgetId, template);
          }
          if (template) {
            new WidgetEditorModal(this.app, this, async (saved) => {
              await this.saveToGallery(saved);
              this.templateCache.set(saved.id, saved);
              new import_obsidian.Notice(`Widget "${saved.name}" updated!`);
              this.app.workspace.trigger("layout-change");
            }, template).open();
          } else {
            new import_obsidian.Notice(`Could not load widget "${widgetId}" from gallery.`);
          }
        });
        createBtn("\u{1F513}", "Convert to Local Widget (Full Code)", async () => {
          const view = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
          if (view) {
            const editor = view.editor;
            const section = ctx.getSectionInfo(el);
            if (section) {
              const rangeStart = { line: section.lineStart, ch: 0 };
              const rangeEnd = { line: section.lineEnd + 1, ch: 0 };
              const dataSection = inlineDataStr && inlineDataStr.trim() !== "" && inlineDataStr.trim() !== "{}" ? `
---
${inlineDataStr.trim()}` : "";
              const newContent = `
\`\`\`widget
ID: ${widgetId}
${htmlContent}
---
${cssContent}
---
${jsContent}${dataSection}
\`\`\`

`;
              editor.replaceRange(newContent, rangeStart, rangeEnd);
              new import_obsidian.Notice("Converted to Local Widget!");
            }
          }
        });
      } else {
        createBtn("\u{1F4BE}", "Save to gallery", () => {
          const template = {
            id: widgetId || `widget_${Date.now()}`,
            name: widgetId || "New Widget",
            html: htmlContent,
            css: cssContent,
            js: jsContent
          };
          new WidgetEditorModal(this.app, this, async (saved) => {
            await this.saveToGallery(saved);
            new import_obsidian.Notice(`Widget "${saved.name}" saved to gallery!`);
          }, template).open();
        });
        createBtn("\u270F\uFE0F", "Edit this widget", () => {
          const template = {
            id: widgetId || `widget_${Date.now()}`,
            name: widgetId || "Local Widget",
            html: htmlContent,
            css: cssContent,
            js: jsContent,
            data: inlineDataStr ? JSON.parse(inlineDataStr) : void 0
          };
          const modal = new WidgetEditorModal(this.app, this, async (saved) => {
            await this.saveToGallery(saved);
            new import_obsidian.Notice(`Widget "${saved.name}" saved to gallery!`);
            const view = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
            if (view) {
              const editor = view.editor;
              const section = ctx.getSectionInfo(el);
              if (section) {
                const rangeStart = { line: section.lineStart, ch: 0 };
                const rangeEnd = { line: section.lineEnd + 1, ch: 0 };
                const dataSection = saved.data && JSON.stringify(saved.data) !== "{}" ? `
---
${JSON.stringify(saved.data, null, 2)}` : "";
                const newContent = `
\`\`\`widget
ID: ${saved.id}
${saved.html}
---
${saved.css}
---
${saved.js}${dataSection}
\`\`\`

`;
                editor.replaceRange(newContent, rangeStart, rangeEnd);
              }
            }
          }, template);
          modal.open();
        });
        createBtn("\u{1F517}", "Convert to Linked Widget (Short Code)", async () => {
          if (!widgetId) {
            new import_obsidian.Notice("Please save the widget with an ID first (or add ID: name to the block).");
            return;
          }
          const galleryPath = await this.getGalleryFilePath(widgetId);
          if (!galleryPath) {
            new import_obsidian.Notice(`Widget "${widgetId}" not found in gallery. Please save it first.`);
            return;
          }
          const view = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
          if (view) {
            const editor = view.editor;
            const section = ctx.getSectionInfo(el);
            if (section) {
              const rangeStart = { line: section.lineStart, ch: 0 };
              const rangeEnd = { line: section.lineEnd + 1, ch: 0 };
              const dataSection = inlineDataStr && inlineDataStr.trim() !== "" && inlineDataStr.trim() !== "{}" ? `
---
---
---
${inlineDataStr.trim()}` : "";
              const newContent = `
\`\`\`widget
ID: ${widgetId}${dataSection}
\`\`\`

`;
              editor.replaceRange(newContent, rangeStart, rangeEnd);
              new import_obsidian.Notice("Converted to Linked Widget!");
            }
          }
        });
      }
      let focusedId = null;
      let selectionStart = null;
      let selectionEnd = null;
      const activeEl = document.activeElement;
      if (activeEl && el.contains(activeEl)) {
        const shadowActive = container.shadowRoot?.activeElement;
        if (shadowActive && shadowActive.id) {
          focusedId = shadowActive.id;
          selectionStart = shadowActive.selectionStart;
          selectionEnd = shadowActive.selectionEnd;
        }
      }
      const shadow = container.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent = `
                :host { display: block; position: relative; width: 100%; padding: 4px; box-sizing: border-box; }
                ${cssContent}
            `;
      shadow.appendChild(style);
      const innerDiv = document.createElement("div");
      innerDiv.innerHTML = htmlContent + "<slot></slot>";
      shadow.appendChild(innerDiv);
      let saveTimeout = null;
      const api = {
        root: shadow,
        saveState: async (data) => {
          const section = ctx.getSectionInfo(el);
          if (section) {
            const file = this.app.vault.getAbstractFileByPath(ctx.sourcePath);
            if (file instanceof import_obsidian.TFile) {
              const newDataStr = JSON.stringify(data, null, 2);
              if (saveTimeout) clearTimeout(saveTimeout);
              saveTimeout = setTimeout(async () => {
                try {
                  await this.app.vault.process(file, (oldContent) => {
                    const widgetRegex = /(```widget\n)([\s\S]*?)(```)/g;
                    let match;
                    let targetMatch = null;
                    let matchIndex = 0;
                    while ((match = widgetRegex.exec(oldContent)) !== null) {
                      const matchStart = oldContent.substring(0, match.index).split("\n").length - 1;
                      if (matchStart === section.lineStart) {
                        targetMatch = match;
                        break;
                      }
                      matchIndex++;
                    }
                    if (!targetMatch) return oldContent;
                    const blockContent = targetMatch[2];
                    const blockSections = this.splitOnDelimiters(blockContent, 3);
                    const finalSections = ["", "", "", ""];
                    const firstSection2 = blockSections[0] || "";
                    const isLinkedWidget = firstSection2.includes("ID:") && blockSections.length >= 2 && !blockSections[1].trim() && (blockSections.length < 3 || !blockSections[2].trim());
                    if (isLinkedWidget) {
                      finalSections[0] = blockSections[0];
                      finalSections[1] = "";
                      finalSections[2] = "";
                      finalSections[3] = blockSections[blockSections.length - 1];
                    } else {
                      if (blockSections.length === 4) {
                        finalSections[0] = blockSections[0];
                        finalSections[1] = blockSections[1];
                        finalSections[2] = blockSections[2];
                        finalSections[3] = blockSections[3];
                      } else if (blockSections.length === 1) {
                        finalSections[0] = blockSections[0];
                      } else if (blockSections.length === 2) {
                        finalSections[0] = blockSections[0];
                        finalSections[3] = blockSections[1];
                      } else if (blockSections.length === 3) {
                        finalSections[0] = blockSections[0];
                        finalSections[1] = blockSections[1];
                        finalSections[3] = blockSections[2];
                      }
                    }
                    const currentDataStr = finalSections[3]?.trim() || "";
                    if (newDataStr === currentDataStr) return oldContent;
                    let newBlockContent;
                    if (isLinkedWidget) {
                      newBlockContent = finalSections[0].trim() + "\n---\n---\n---\n" + newDataStr.trim() + "\n";
                    } else {
                      const reconstructedSections = [
                        finalSections[0].trim(),
                        finalSections[1].trim(),
                        finalSections[2].trim(),
                        newDataStr.trim()
                      ];
                      newBlockContent = reconstructedSections.join("\n---\n") + "\n";
                    }
                    return oldContent.replace(targetMatch[0], "```widget\n" + newBlockContent + "```");
                  });
                } catch (e) {
                  console.error("Inline save failed:", e);
                }
              }, 500);
            }
          }
        },
        getState: async () => {
          if (inlineDataStr && inlineDataStr !== "{}") {
            try {
              return JSON.parse(inlineDataStr);
            } catch (e) {
            }
          }
          return null;
        },
        instanceId,
        requestUrl: import_obsidian.requestUrl,
        getFrontmatter: async (path) => {
          const targetPath = path || ctx.sourcePath;
          const file = this.app.vault.getAbstractFileByPath(targetPath);
          if (file instanceof import_obsidian.TFile) {
            const cache = this.app.metadataCache.getFileCache(file);
            return cache?.frontmatter || {};
          }
          return {};
        },
        updateFrontmatter: async (data, path) => {
          const targetPath = path || ctx.sourcePath;
          const file = this.app.vault.getAbstractFileByPath(targetPath);
          if (file instanceof import_obsidian.TFile) {
            await this.app.fileManager.processFrontMatter(file, (frontmatter) => {
              Object.assign(frontmatter, data);
            });
          }
        },
        getWidgetState: async (widgetId2, path) => {
          const targetPath = path || ctx.sourcePath;
          const file = this.app.vault.getAbstractFileByPath(targetPath);
          if (!(file instanceof import_obsidian.TFile)) return null;
          const content = await this.app.vault.read(file);
          const regex = new RegExp("```widget\\s*\\nID:\\s*" + widgetId2 + "\\s*\\n([\\s\\S]*?)\\n```", "i");
          const match = content.match(regex);
          if (!match) return null;
          const blockContent = match[1];
          const sections2 = this.splitOnDelimiters(blockContent, 3);
          if (sections2.length < 4) return null;
          try {
            return JSON.parse(sections2[3].trim());
          } catch (e) {
            return null;
          }
        },
        updateWidgetState: async (widgetId2, data, path) => {
          const targetPath = path || ctx.sourcePath;
          const file = this.app.vault.getAbstractFileByPath(targetPath);
          if (!(file instanceof import_obsidian.TFile)) return;
          await this.app.vault.process(file, (oldContent) => {
            const regex = new RegExp("(```widget\\s*\\nID:\\s*" + widgetId2 + "\\s*\\n)([\\s\\S]*?)(?=\\n```)", "i");
            const match = oldContent.match(regex);
            if (!match) return oldContent;
            const prefix = match[1];
            const blockContent = match[2];
            const blockSections = this.splitOnDelimiters(blockContent, 3);
            const originalDelimiterCount = blockContent.split("\n").filter((line) => line.trim() === "---").length;
            const firstSection2 = blockSections[0] || "";
            const isLinkedWidget = firstSection2.includes("ID:") && blockSections.length >= 2 && !blockSections[1].trim() && (blockSections.length < 3 || !blockSections[2].trim());
            const finalSections = ["", "", "", ""];
            if (isLinkedWidget) {
              finalSections[0] = blockSections[0];
              finalSections[1] = "";
              finalSections[2] = "";
              finalSections[3] = blockSections[blockSections.length - 1];
            } else {
              if (blockSections.length === 4) {
                finalSections[0] = blockSections[0];
                finalSections[1] = blockSections[1];
                finalSections[2] = blockSections[2];
                finalSections[3] = blockSections[3];
              } else if (blockSections.length === 1) {
                finalSections[0] = blockSections[0];
              } else if (blockSections.length === 2) {
                finalSections[0] = blockSections[0];
                finalSections[3] = blockSections[1];
              } else if (blockSections.length === 3) {
                finalSections[0] = blockSections[0];
                finalSections[1] = blockSections[1];
                finalSections[3] = blockSections[2];
              }
            }
            finalSections[3] = "\n" + JSON.stringify(data, null, 2) + "\n";
            let newBlockContent;
            if (isLinkedWidget) {
              newBlockContent = finalSections[0].trim() + "\n---\n---\n---\n" + finalSections[3].trim() + "\n";
            } else {
              const reconstructedSections = [
                finalSections[0].trim(),
                finalSections[1].trim(),
                finalSections[2].trim(),
                finalSections[3].trim()
              ];
              newBlockContent = reconstructedSections.join("\n---\n") + "\n";
            }
            return oldContent.replace(match[0], prefix + newBlockContent);
          });
        },
        getFiles: (extension) => {
          let files = this.app.vault.getFiles();
          if (extension) {
            files = files.filter((f) => f.extension === extension.replace(".", ""));
          }
          return Promise.resolve(files.map((f) => f.path));
        },
        readFile: async (path) => {
          const normalizedPath = (0, import_obsidian.normalizePath)(path);
          try {
            const exists = await this.app.vault.adapter.exists(normalizedPath);
            if (!exists) return null;
            return await this.app.vault.adapter.read(normalizedPath);
          } catch (e) {
            return null;
          }
        },
        writeFile: async (path, content) => {
          const normalizedPath = (0, import_obsidian.normalizePath)(path);
          try {
            const dirPath = normalizedPath.split("/").slice(0, -1).join("/");
            if (dirPath && !await this.app.vault.adapter.exists(dirPath)) {
              await this.app.vault.createFolder(dirPath);
            }
            await this.app.vault.adapter.write(normalizedPath, content);
          } catch (e) {
            console.error("ObsidGet: Error writing file:", e);
          }
        },
        parseCSV: (text, delimiter = ",") => {
          if (!text) return [];
          const lines = text.split("\n").filter((l) => l.trim());
          if (lines.length === 0) return [];
          const headers = lines[0].split(delimiter).map((h) => h.trim());
          return lines.slice(1).map((line) => {
            const values = line.split(delimiter);
            const obj = {};
            headers.forEach((header, i) => {
              obj[header] = values[i]?.trim();
            });
            return obj;
          });
        },
        stringifyCSV: (data, delimiter = ",") => {
          if (!data || data.length === 0) return "";
          const headers = Object.keys(data[0]);
          const csvLines = [headers.join(delimiter)];
          data.forEach((row) => {
            csvLines.push(headers.map((h) => row[h]).join(delimiter));
          });
          return csvLines.join("\n");
        }
      };
      try {
        const widgetContext = {};
        const apiProxy = new Proxy(api, {
          get(target, prop) {
            if (prop in widgetContext) return widgetContext[prop];
            if (prop in target) return target[prop];
            return window[prop];
          },
          set(target, prop, value) {
            widgetContext[prop] = value;
            target[prop] = value;
            return true;
          }
        });
        const functionNames = [];
        const functionRegex = /(?:async\s+)?function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;
        let match;
        while ((match = functionRegex.exec(jsContent)) !== null) {
          if (match[1] !== "init") {
            functionNames.push(match[1]);
          }
        }
        if (/function\s+init\s*\(/.test(jsContent)) {
          functionNames.push("init");
        }
        const functionExports = functionNames.map(
          (name) => `if (typeof ${name} === 'function') api.${name} = ${name};`
        ).join("\n");
        const wrappedScript = `
                    ${jsContent}
                    // After script runs, copy declared functions to api for event handler access
                    try {
                        ${functionExports}
                    } catch(e) { console.error('Function export error:', e); }
                `;
        const scriptFunction = new Function("api", `with(api) { ${wrappedScript} }`);
        scriptFunction(apiProxy);
        this.bindEvents(shadow, apiProxy);
        if (focusedId) {
          setTimeout(() => {
            const elToFocus = shadow.getElementById(focusedId);
            if (elToFocus) {
              elToFocus.focus();
              if (selectionStart !== null && selectionEnd !== null) {
                elToFocus.setSelectionRange(selectionStart, selectionEnd);
              }
            }
          }, 0);
        }
      } catch (e) {
        console.error("Widget JS Error:", e);
      }
    });
  }
  bindEvents(root, apiProxy) {
    const elements = root.querySelectorAll("*");
    elements.forEach((el) => {
      const attrs = el.attributes;
      if (!attrs) return;
      for (let i = 0; i < attrs.length; i++) {
        const attr = attrs[i];
        if (attr.name.startsWith("on") && attr.name !== "on") {
          const eventName = attr.name.substring(2);
          const code = attr.value;
          el.addEventListener(eventName, (e) => {
            try {
              const eventFunc = new Function("api", "event", `with(api) { ${code} }`);
              eventFunc(apiProxy, e);
            } catch (err) {
              console.error(`Error in widget event [${eventName}]:`, err);
            }
          });
          el[attr.name] = null;
        }
      }
    });
  }
  async ensureDirectory(path) {
    if (!await this.app.vault.adapter.exists(path)) {
      await this.app.vault.adapter.mkdir(path);
    }
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    if (this.settings.galleryPath === ".obsidian/plugins/obsidian-widget-css/gallery" || this.settings.galleryPath === ".obsidian/plugins/obsidian-obsidget/gallery") {
      this.settings.galleryPath = ".obsidian/plugins/obsidian-obsidget/gallery";
      await this.saveSettings();
    }
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
  async getGalleryWidgets() {
    const exists = await this.app.vault.adapter.exists(this.settings.galleryPath);
    if (!exists) return [];
    const files = await this.app.vault.adapter.list(this.settings.galleryPath);
    const templates = [];
    const seenIds = /* @__PURE__ */ new Set();
    for (const filePath of files.files) {
      if (!filePath.endsWith(".tsx") && !filePath.endsWith(".ts")) continue;
      const baseName = filePath.includes("/") ? filePath.split("/").pop() : filePath;
      const id = baseName.replace(/\.(tsx?)$/, "");
      if (seenIds.has(id)) continue;
      seenIds.add(id);
      const fullPath = filePath.startsWith(".") || filePath.includes("/") ? filePath : (0, import_obsidian.normalizePath)(`${this.settings.galleryPath}/${filePath}`);
      try {
        const content = await this.app.vault.adapter.read(fullPath);
        const t = this.parseTsTsxExport(content);
        if (t && t.id) templates.push(t);
      } catch (e) {
        console.error(`Failed to parse gallery item: ${fullPath}`, e);
      }
    }
    return templates;
  }
  async saveToGallery(template) {
    template.lastModifiedDate = Date.now();
    if (!template.createdDate) {
      template.createdDate = Date.now();
    }
    const filePath = (0, import_obsidian.normalizePath)(`${this.settings.galleryPath}/${template.id}.tsx`);
    const content = `export default ${JSON.stringify(template, null, 2)};
`;
    await this.app.vault.adapter.write(filePath, content);
  }
  async deleteFromGallery(id) {
    const pathTsx = (0, import_obsidian.normalizePath)(`${this.settings.galleryPath}/${id}.tsx`);
    const pathTs = (0, import_obsidian.normalizePath)(`${this.settings.galleryPath}/${id}.ts`);
    if (await this.app.vault.adapter.exists(pathTsx)) await this.app.vault.adapter.remove(pathTsx);
    if (await this.app.vault.adapter.exists(pathTs)) await this.app.vault.adapter.remove(pathTs);
  }
  async syncGallery() {
    try {
      const apiUrl = "https://api.github.com/repos/infinition/obsidian-obsidget/contents/gallery";
      console.log("ObsidGet: Syncing gallery from:", apiUrl);
      const response = await (0, import_obsidian.requestUrl)({ url: apiUrl });
      console.log("ObsidGet: GitHub Response Status:", response.status);
      if (response.status !== 200) {
        throw new Error(`GitHub API returned ${response.status}. Make sure the repository and 'gallery' folder exist.`);
      }
      const files = response.json;
      if (!Array.isArray(files)) {
        throw new Error("GitHub API did not return a list of files.");
      }
      console.log(`ObsidGet: ${files.length} items found on GitHub gallery.`);
      let addedCount = 0;
      await this.ensureDirectory(this.settings.galleryPath);
      for (const file of files) {
        if (file.name.endsWith(".tsx") || file.name.endsWith(".ts")) {
          const fileName = file.name;
          const id = fileName.replace(/\.(tsx?)$/, "");
          const localPath = (0, import_obsidian.normalizePath)(`${this.settings.galleryPath}/${fileName}`);
          const exists = await this.app.vault.adapter.exists(localPath);
          if (!exists) {
            console.log("ObsidGet: Downloading new widget:", file.name);
            const fileResponse = await (0, import_obsidian.requestUrl)({ url: file.download_url });
            if (fileResponse.status === 200) {
              try {
                await this.app.vault.adapter.write(localPath, fileResponse.text);
                addedCount++;
              } catch (e) {
                console.error(`ObsidGet: Failed to write ${file.name}:`, e);
              }
            } else {
              console.error(`ObsidGet: Failed to download ${file.name}:`, fileResponse.status);
            }
          }
        }
      }
      console.log(`ObsidGet: Sync complete. ${addedCount} widgets added.`);
      new import_obsidian.Notice(this.t("syncSuccess", addedCount));
    } catch (e) {
      console.error("ObsidGet: Sync failed:", e);
      new import_obsidian.Notice(`Sync failed: ${e.message}`);
    }
  }
  async checkForUpdates(quiet = false) {
    try {
      const PLUGIN_ID = this.manifest.id;
      const now = Date.now();
      const CHECK_INTERVAL = 1e3 * 60 * 60 * 24;
      const lastChecked = this.app.plugins?.manifests?.[PLUGIN_ID]?.lastUpdateCheck;
      if (quiet && lastChecked && now - lastChecked < CHECK_INTERVAL) {
        return false;
      }
      if (!quiet) new import_obsidian.Notice(this.t("checkingForUpdates"));
      const releaseUrl = "https://api.github.com/repos/infinition/obsidian-obsidget/releases/latest";
      const response = await (0, import_obsidian.requestUrl)({ url: releaseUrl });
      if (response.status !== 200) {
        if (!quiet) throw new Error(`GitHub API returned ${response.status}`);
        return false;
      }
      const release = response.json;
      const latestVersion = release.tag_name.replace(/^v/, "");
      const currentVersion = this.manifest.version;
      if (this.app.plugins?.manifests?.[PLUGIN_ID]) {
        this.app.plugins.manifests[PLUGIN_ID].lastUpdateCheck = now;
      }
      if (latestVersion !== currentVersion) {
        new import_obsidian.Notice(this.t("updateAvailable", latestVersion, currentVersion), 1e4);
        return true;
      } else {
        if (!quiet) new import_obsidian.Notice(this.t("pluginUpToDate", currentVersion));
        return false;
      }
    } catch (e) {
      if (!quiet) {
        console.error("ObsidGet: Update check failed:", e);
        new import_obsidian.Notice(`Update check failed: ${e.message}`);
      }
      return false;
    }
  }
  async updatePlugin() {
    try {
      const releaseUrl = "https://api.github.com/repos/infinition/obsidian-obsidget/releases/latest";
      new import_obsidian.Notice("Checking for plugin updates...");
      const response = await (0, import_obsidian.requestUrl)({ url: releaseUrl });
      if (response.status !== 200) {
        throw new Error(`GitHub API returned ${response.status}`);
      }
      const release = response.json;
      const assets = release.assets;
      if (!assets || !Array.isArray(assets)) {
        throw new Error("No assets found in the latest release.");
      }
      const filesToDownload = ["main.js", "manifest.json", "styles.css"];
      const pluginDir = `.obsidian/plugins/obsidian-obsidget`;
      for (const fileName of filesToDownload) {
        const asset = assets.find((a) => a.name === fileName);
        if (asset) {
          new import_obsidian.Notice(`Downloading ${fileName}...`);
          const fileResponse = await (0, import_obsidian.requestUrl)({ url: asset.browser_download_url });
          if (fileResponse.status === 200) {
            await this.app.vault.adapter.write(`${pluginDir}/${fileName}`, fileResponse.text);
          }
        }
      }
      new import_obsidian.Notice("Plugin updated! Reloading...");
      const plugins = this.app.plugins;
      await plugins.disablePlugin(this.manifest.id);
      await plugins.enablePlugin(this.manifest.id);
    } catch (e) {
      console.error("ObsidGet: Plugin update failed:", e);
      new import_obsidian.Notice(`Update failed: ${e.message}`);
    }
  }
  async updateAllWidgetsInVault() {
    try {
      const files = this.app.vault.getMarkdownFiles();
      let updatedWidgetsCount = 0;
      let updatedFilesCount = 0;
      const galleryWidgets = await this.getGalleryWidgets();
      const galleryMap = new Map(galleryWidgets.map((w) => [w.id, w]));
      if (galleryMap.size === 0) {
        new import_obsidian.Notice(this.t("updateAllWidgetsNoWidgets"));
        return;
      }
      const widgetRegex = /```widget\n([\s\S]*?)```/g;
      for (const file of files) {
        await this.app.vault.process(file, (content) => {
          let fileUpdated = false;
          const newContent = content.replace(widgetRegex, (match, source) => {
            const sections = [];
            let remaining = source;
            for (let i = 0; i < 3; i++) {
              const index = remaining.indexOf("---");
              if (index !== -1) {
                sections.push(remaining.substring(0, index));
                remaining = remaining.substring(index + 3);
              } else {
                break;
              }
            }
            sections.push(remaining);
            let firstSection = sections[0].trim();
            let widgetId = "";
            if (firstSection.startsWith("ID:")) {
              const lines = firstSection.split("\n");
              widgetId = lines[0].replace("ID:", "").trim().replace(/[^a-zA-Z0-9_-]/g, "");
            }
            if (widgetId && galleryMap.has(widgetId)) {
              const template = galleryMap.get(widgetId);
              const dataSection = sections[3] || "";
              const trimmedData = dataSection.trim();
              const newBlock = [
                `ID: ${widgetId}
${template.html.trim()}`,
                template.css.trim(),
                template.js.trim(),
                trimmedData
              ].join("\n---\n") + (trimmedData ? "\n" : "");
              if (`\`\`\`widget
${newBlock}\`\`\`` !== match) {
                updatedWidgetsCount++;
                fileUpdated = true;
                return `\`\`\`widget
${newBlock}\`\`\``;
              }
            }
            return match;
          });
          if (fileUpdated) {
            updatedFilesCount++;
            return newContent;
          }
          return content;
        });
      }
      if (updatedWidgetsCount > 0) {
        new import_obsidian.Notice(this.t("updateAllWidgetsSuccess", updatedWidgetsCount, updatedFilesCount));
      } else {
        new import_obsidian.Notice(this.t("updateAllWidgetsNoWidgets"));
      }
    } catch (e) {
      console.error("ObsidGet: Update all widgets failed:", e);
      new import_obsidian.Notice(this.t("updateAllWidgetsError", e.message));
    }
  }
};
var WidgetGalleryModal = class extends import_obsidian.Modal {
  constructor(app, plugin, editor) {
    super(app);
    this.searchQuery = "";
    this.currentPage = 1;
    this.itemsPerPage = 50;
    this.allTemplates = [];
    this.filteredTemplates = [];
    this.allTags = [];
    this.selectedTag = "";
    this.targetEditor = null;
    this.sortOption = "modified";
    this.plugin = plugin;
    this.isMobile = app.isMobile;
    this.targetEditor = editor || null;
  }
  async onOpen() {
    const { contentEl } = this;
    this.modalEl.addClass("widget-gallery-modal");
    contentEl.empty();
    const header = contentEl.createDiv({ cls: "gallery-header" });
    header.createEl("h2", { text: this.plugin.t("galleryTitle") });
    const closeBtn = header.createEl("button", { text: "\u2715", cls: "gallery-close-btn" });
    closeBtn.onclick = () => this.close();
    const controlsContainer = contentEl.createDiv({ cls: "gallery-controls" });
    const searchContainer = controlsContainer.createDiv({ cls: "gallery-search-container" });
    this.searchInputEl = searchContainer.createEl("input", {
      attr: { type: "text", placeholder: this.plugin.t("searchPlaceholder") },
      cls: "gallery-search-input"
    });
    this.searchInputEl.oninput = (e) => {
      this.searchQuery = e.target.value.toLowerCase();
      this.updateClearButton();
      this.currentPage = 1;
      this.filterAndRender();
    };
    this.clearBtnEl = searchContainer.createSpan({ cls: "gallery-search-clear", text: "\u2715" });
    this.clearBtnEl.onclick = () => {
      this.searchInputEl.value = "";
      this.searchQuery = "";
      this.updateClearButton();
      this.currentPage = 1;
      this.filterAndRender();
    };
    this.updateClearButton();
    searchContainer.createSpan({ cls: "gallery-search-icon", text: "\u{1F50D}" });
    const tagContainer = controlsContainer.createDiv({ cls: "gallery-tag-container" });
    this.tagSelectEl = tagContainer.createEl("select", { cls: "gallery-tag-select" });
    this.tagSelectEl.onchange = () => {
      this.selectedTag = this.tagSelectEl.value;
      this.currentPage = 1;
      this.filterAndRender();
    };
    const sortContainer = controlsContainer.createDiv({ cls: "gallery-sort-container" });
    this.sortSelectEl = sortContainer.createEl("select", { cls: "gallery-sort-select" });
    const sortOptions = [
      { value: "modified", label: this.plugin.t("sortByLastModified") },
      { value: "created", label: this.plugin.t("sortByCreated") },
      { value: "name", label: this.plugin.t("sortByName") }
    ];
    sortOptions.forEach((opt) => {
      const option = document.createElement("option");
      option.value = opt.value;
      option.textContent = opt.label;
      if (this.sortOption === opt.value) option.selected = true;
      this.sortSelectEl.appendChild(option);
    });
    this.sortSelectEl.onchange = () => {
      this.sortOption = this.sortSelectEl.value;
      this.currentPage = 1;
      this.filterAndRender();
    };
    const addBtn = controlsContainer.createEl("button", { text: `+ ${this.plugin.t("addWidget")}`, cls: "mod-cta gallery-add-btn" });
    addBtn.onclick = () => this.openWidgetEditor();
    const syncBtn = controlsContainer.createEl("button", { text: `\u{1F504}`, cls: "gallery-sync-btn", attr: { title: this.plugin.t("syncGalleryBtn") } });
    syncBtn.onclick = async () => {
      syncBtn.addClass("is-loading");
      await this.plugin.syncGallery();
      syncBtn.removeClass("is-loading");
      await this.refresh();
    };
    this.gridEl = contentEl.createDiv({ cls: "widget-gallery-grid" });
    this.allTemplates = await this.plugin.getGalleryWidgets();
    if (this.allTemplates.length === 0) {
      await this.plugin.syncGallery();
      this.allTemplates = await this.plugin.getGalleryWidgets();
    }
    this.extractAllTags();
    this.populateTagDropdown();
    const msg = this.allTags.length > 0 ? this.plugin.t("loadedMsg", this.allTemplates.length, this.allTags.length) : this.plugin.t("loadedNoTagsMsg", this.allTemplates.length);
    this.showToast(msg);
    this.filterAndRender();
    if (!this.isMobile) {
      contentEl.onscroll = () => {
        if (contentEl.scrollTop + contentEl.clientHeight >= contentEl.scrollHeight - 100) {
          this.loadMore();
        }
      };
    }
  }
  showToast(message) {
    const toast = document.createElement("div");
    toast.className = "gallery-toast";
    toast.textContent = message;
    document.body.appendChild(toast);
    void toast.offsetHeight;
    toast.classList.add("is-visible");
    setTimeout(() => {
      toast.classList.remove("is-visible");
      setTimeout(() => toast.remove(), 500);
    }, 3e3);
  }
  updateClearButton() {
    if (this.searchQuery.length > 0) {
      this.clearBtnEl.style.display = "flex";
    } else {
      this.clearBtnEl.style.display = "none";
    }
  }
  extractAllTags() {
    const tagSet = /* @__PURE__ */ new Set();
    this.allTemplates.forEach((t) => {
      if (t.tags && Array.isArray(t.tags)) {
        t.tags.forEach((tag) => tagSet.add(tag.toLowerCase().trim()));
      }
    });
    this.allTags = Array.from(tagSet).sort();
  }
  populateTagDropdown() {
    this.tagSelectEl.innerHTML = "";
    const allOption = document.createElement("option");
    allOption.value = "";
    allOption.textContent = `\u{1F3F7}\uFE0F ${this.plugin.t("allTags")}`;
    if (this.selectedTag === "") allOption.selected = true;
    this.tagSelectEl.appendChild(allOption);
    this.allTags.forEach((tag) => {
      const option = document.createElement("option");
      option.value = tag;
      option.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
      if (this.selectedTag === tag) option.selected = true;
      this.tagSelectEl.appendChild(option);
    });
  }
  filterAndRender() {
    let searchText = this.searchQuery.trim();
    let tagFromSearch = "";
    if (searchText.startsWith("#")) {
      const tagMatch = searchText.slice(1).trim();
      if (tagMatch.length > 0) {
        tagFromSearch = tagMatch;
        searchText = "";
      }
    }
    const activeTag = tagFromSearch || this.selectedTag;
    this.filteredTemplates = this.allTemplates.filter((t) => {
      const matchesSearch = searchText.length === 0 || t.name.toLowerCase().includes(searchText) || t.id.toLowerCase().includes(searchText) || t.description && t.description.toLowerCase().includes(searchText) || t.tags && t.tags.some((tag) => tag.toLowerCase().includes(searchText));
      const matchesTags = activeTag.length === 0 || t.tags && t.tags.some((tag) => tag.toLowerCase().includes(activeTag));
      return matchesSearch && matchesTags;
    });
    this.filteredTemplates.sort((a, b) => {
      if (this.sortOption === "name") {
        return a.name.localeCompare(b.name);
      } else if (this.sortOption === "created") {
        const dateA = a.createdDate || 0;
        const dateB = b.createdDate || 0;
        if (dateA === dateB) return a.name.localeCompare(b.name);
        return dateB - dateA;
      } else {
        const dateA = a.lastModifiedDate || 0;
        const dateB = b.lastModifiedDate || 0;
        if (dateA === dateB) return a.name.localeCompare(b.name);
        return dateB - dateA;
      }
    });
    this.gridEl.empty();
    this.renderVisibleWidgets();
    this.renderPagination();
  }
  renderVisibleWidgets() {
    let toShow = [];
    if (this.isMobile) {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      toShow = this.filteredTemplates.slice(start, start + this.itemsPerPage);
    } else {
      toShow = this.filteredTemplates.slice(0, this.currentPage * this.itemsPerPage);
    }
    if (toShow.length === 0 && this.currentPage === 1) {
      this.gridEl.createEl("p", { text: this.plugin.t("noResults"), cls: "no-results" });
      return;
    }
    toShow.forEach((template) => this.renderWidgetCard(template));
  }
  renderWidgetCard(template) {
    const card = this.gridEl.createDiv({ cls: "widget-card" });
    const cardHeader = card.createDiv({ cls: "widget-card-header" });
    cardHeader.createEl("h3", { text: template.name });
    if (template.author) {
      const authorRow = cardHeader.createDiv({ cls: "widget-card-author" });
      if (template.authorUrl) {
        const authorLink = authorRow.createEl("a", {
          text: `\u{1F464} ${template.author}`,
          href: template.authorUrl,
          cls: "widget-author-link"
        });
        authorLink.setAttribute("target", "_blank");
      } else {
        authorRow.createSpan({ text: `\u{1F464} ${template.author}` });
      }
    }
    if (template.tags && template.tags.length > 0) {
      const tagsContainer = cardHeader.createDiv({ cls: "widget-card-tags" });
      template.tags.slice(0, 3).forEach((tag) => {
        tagsContainer.createSpan({ text: tag, cls: "widget-tag" });
      });
      if (template.tags.length > 3) {
        tagsContainer.createSpan({ text: `+${template.tags.length - 3}`, cls: "widget-tag more" });
      }
    }
    if (template.description) {
      const descContainer = card.createDiv({ cls: "widget-card-description" });
      const descText = descContainer.createEl("p", { text: template.description });
      descContainer.onclick = () => {
        const popup = new import_obsidian.Modal(this.app);
        popup.titleEl.setText(template.name);
        popup.contentEl.createEl("p", { text: template.description });
        popup.open();
      };
    }
    const preview = card.createDiv({ cls: "widget-preview" });
    preview.style.minHeight = "300px";
    const shadow = preview.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = `:host { display: block; padding: 4px; width: 100%; min-height: 300px; max-width: 100%; overflow: hidden; pointer-events: none; user-select: none; box-sizing: border-box; } * { pointer-events: none !important; max-width: 100%; box-sizing: border-box; } img, video, iframe { max-width: 100%; height: auto; } ${template.css}`;
    shadow.appendChild(style);
    const innerWrap = document.createElement("div");
    innerWrap.style.width = "100%";
    innerWrap.innerHTML = template.html;
    shadow.appendChild(innerWrap);
    const actions = card.createDiv({ cls: "widget-card-actions" });
    const insertBtn = actions.createEl("button", { text: `\u{1F4E5} ${this.plugin.t("insert")}`, cls: "mod-cta" });
    insertBtn.onclick = () => {
      this.insertWidget(template, true);
    };
    const insertFullBtn = actions.createEl("button", { text: `\u{1F4C4}`, attr: { title: this.plugin.t("insertFullCode") || "Insert Full Code (Local)" } });
    insertFullBtn.onclick = () => {
      this.insertWidget(template, false);
    };
    const editBtn = actions.createEl("button", { text: `\u270F\uFE0F ${this.plugin.t("edit")}` });
    editBtn.onclick = () => this.openWidgetEditor(template);
    const deleteBtn = actions.createEl("button", { text: "\u{1F5D1}\uFE0F", cls: "mod-warning" });
    deleteBtn.onclick = async () => {
      if (confirm(this.plugin.t("deleteConfirm"))) {
        await this.plugin.deleteFromGallery(template.id);
        new import_obsidian.Notice(this.plugin.t("widgetDeleted"));
        this.allTemplates = await this.plugin.getGalleryWidgets();
        this.extractAllTags();
        this.populateTagDropdown();
        this.filterAndRender();
      }
    };
  }
  renderPagination() {
    const existingPagination = this.contentEl.querySelector(".gallery-pagination");
    if (existingPagination) existingPagination.remove();
    if (!this.isMobile) return;
    const totalPages = Math.ceil(this.filteredTemplates.length / this.itemsPerPage);
    if (totalPages <= 1) return;
    const pagination = this.contentEl.createDiv({ cls: "gallery-pagination" });
    const prevBtn = pagination.createEl("button", { text: `\u2190 ${this.plugin.t("previous")}` });
    prevBtn.disabled = this.currentPage === 1;
    prevBtn.onclick = () => {
      this.currentPage--;
      this.gridEl.empty();
      this.renderVisibleWidgets();
      this.renderPagination();
      this.contentEl.scrollTop = 0;
    };
    pagination.createSpan({ text: ` ${this.plugin.t("pageInfo", this.currentPage, totalPages)} ` });
    const nextBtn = pagination.createEl("button", { text: `${this.plugin.t("next")} \u2192` });
    nextBtn.disabled = this.currentPage === totalPages;
    nextBtn.onclick = () => {
      this.currentPage++;
      this.gridEl.empty();
      this.renderVisibleWidgets();
      this.renderPagination();
      this.contentEl.scrollTop = 0;
    };
  }
  loadMore() {
    if (this.currentPage * this.itemsPerPage < this.filteredTemplates.length) {
      this.currentPage++;
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const nextBatch = this.filteredTemplates.slice(start, start + this.itemsPerPage);
      nextBatch.forEach((template) => this.renderWidgetCard(template));
    }
  }
  async insertWidget(template, linked = true) {
    const activeView = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
    const editor = this.targetEditor || activeView?.editor;
    if (!editor && !activeView) {
      new import_obsidian.Notice(this.plugin.t("insertError"));
      return;
    }
    const dataStr = template.data ? JSON.stringify(template.data, null, 2) : "";
    let content = "";
    if (linked) {
      const dataSection = dataStr && dataStr.trim() !== "" && dataStr.trim() !== "{}" ? `
---
---
---
${dataStr.trim()}` : "";
      content = `

\`\`\`widget
ID: ${template.id}${dataSection}
\`\`\`

`;
    } else {
      content = `

\`\`\`widget
ID: ${template.id}
${template.html}
---
${template.css}
---
${template.js}
---
${dataStr}
\`\`\`

`;
    }
    if (editor) {
      const cursor = editor.getCursor();
      editor.replaceRange(content, cursor);
      new import_obsidian.Notice(this.plugin.t("widgetSaved"));
    } else if (activeView) {
      const activeFile = activeView.file;
      if (activeFile) {
        await this.app.vault.append(activeFile, content);
        new import_obsidian.Notice(this.plugin.t("widgetSaved"));
      }
    }
  }
  async refresh() {
    this.allTemplates = await this.plugin.getGalleryWidgets();
    this.extractAllTags();
    this.populateTagDropdown();
    this.filterAndRender();
  }
  openWidgetEditor(template) {
    new WidgetEditorModal(this.app, this.plugin, async (saved) => {
      this.allTemplates = await this.plugin.getGalleryWidgets();
      this.extractAllTags();
      this.populateTagDropdown();
      this.filterAndRender();
    }, template).open();
  }
};
var WidgetEditorModal = class extends import_obsidian.Modal {
  constructor(app, plugin, onSave, template) {
    super(app);
    this.activeTab = "code";
    this.initialVariables = /* @__PURE__ */ new Map();
    this.plugin = plugin;
    this.onSave = onSave;
    this.template = template ? { ...template, tags: template.tags || [] } : {
      id: `widget_${Date.now()}`,
      name: "Nouveau Widget",
      html: "<div>Hello Widget</div>",
      css: "div { color: var(--text-accent); }",
      js: 'console.log("Widget loaded");',
      tags: []
    };
    this.originalId = template ? template.id : "";
    this.initialCss = this.template.css;
    const varRegex = /(--[a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g;
    let match;
    while ((match = varRegex.exec(this.initialCss)) !== null) {
      this.initialVariables.set(match[1], match[2].trim());
    }
    this.previewEl = document.createElement("div");
    this.editorContainer = document.createElement("div");
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    this.modalEl.addClass("widget-editor-modal-v2");
    const mainContainer = contentEl.createDiv({ cls: "editor-main-container" });
    this.editorContainer = mainContainer.createDiv({ cls: "editor-side" });
    const previewSide = mainContainer.createDiv({ cls: "preview-side" });
    previewSide.createEl("h3", { text: `\u{1F441}\uFE0F ${this.plugin.t("livePreview")}` });
    this.previewEl = previewSide.createDiv({ cls: "preview-container" });
    this.renderEditor();
    this.updatePreview();
  }
  renderEditor() {
    this.editorContainer.empty();
    const isNew = !this.template.name || this.template.name === "Nouveau Widget";
    this.editorContainer.createEl("h2", { text: isNew ? `\u2728 ${this.plugin.t("createWidget")}` : this.plugin.t("editWidget", this.template.name) });
    const tabsContainer = this.editorContainer.createDiv({ cls: "editor-tabs" });
    const tabs = [
      { id: "info", label: "\u2139\uFE0F Info" },
      { id: "code", label: `\u{1F4BB} ${this.plugin.t("tabCode")}` },
      { id: "visual", label: `\u{1F3A8} ${this.plugin.t("tabVisual")}` }
    ];
    tabs.forEach((tab) => {
      const tabBtn = tabsContainer.createEl("button", {
        text: tab.label,
        cls: `tab-btn ${this.activeTab === tab.id ? "is-active" : ""}`
      });
      tabBtn.onclick = () => {
        this.activeTab = tab.id;
        this.renderEditor();
      };
    });
    const scrollArea = this.editorContainer.createDiv({ cls: "editor-scroll-area" });
    if (this.activeTab === "info") {
      new import_obsidian.Setting(scrollArea).setName(this.plugin.t("widgetName")).addText((text) => text.setValue(this.template.name).onChange((v) => {
        this.template.name = v;
        this.updatePreview(false);
      }));
      new import_obsidian.Setting(scrollArea).setName(this.plugin.t("widgetId")).addText((text) => text.setValue(this.template.id).onChange((v) => {
        this.template.id = v.replace(/[^a-zA-Z0-9_-]/g, "");
      }));
      new import_obsidian.Setting(scrollArea).setName(this.plugin.t("widgetTags")).addText((text) => text.setValue((this.template.tags || []).join(", ")).onChange((v) => {
        this.template.tags = v.split(",").map((t) => t.trim()).filter((t) => t.length > 0);
      }));
      new import_obsidian.Setting(scrollArea).setName(this.plugin.t("widgetDescription")).setDesc(this.plugin.t("widgetDescriptionDesc")).addTextArea((text) => text.setValue(this.template.description || "").onChange((v) => this.template.description = v));
      new import_obsidian.Setting(scrollArea).setName(this.plugin.t("widgetAuthor")).setDesc(this.plugin.t("widgetAuthorDesc")).addText((text) => text.setValue(this.template.author || "").onChange((v) => this.template.author = v));
      new import_obsidian.Setting(scrollArea).setName(this.plugin.t("widgetAuthorUrl")).setDesc(this.plugin.t("widgetAuthorUrlDesc")).addText((text) => text.setValue(this.template.authorUrl || "").onChange((v) => this.template.authorUrl = v));
    } else if (this.activeTab === "code") {
      this.createEditorField(scrollArea, this.plugin.t("htmlContent"), this.template.html, (v) => {
        this.template.html = v;
        this.updatePreview(false);
      });
      this.createEditorField(scrollArea, this.plugin.t("cssContent"), this.template.css, (v) => {
        this.template.css = v;
        this.updatePreview(true);
      });
      this.createEditorField(scrollArea, this.plugin.t("jsContent"), this.template.js, (v) => {
        this.template.js = v;
        this.updatePreview(false);
      });
    } else if (this.activeTab === "visual") {
      this.renderVisualEditor(scrollArea);
    }
    const footer = this.editorContainer.createDiv({ cls: "modal-footer" });
    const cancelBtn = footer.createEl("button", { text: this.plugin.t("cancel") });
    cancelBtn.onclick = () => this.close();
    const saveBtn = footer.createEl("button", { text: `\u{1F4BE} ${this.plugin.t("saveWidget")}`, cls: "mod-cta" });
    saveBtn.onclick = async () => {
      if (!this.template.id) {
        new import_obsidian.Notice("ID is required");
        return;
      }
      if (this.template.id !== this.originalId) {
        const exists = await this.plugin.getGalleryFilePath(this.template.id);
        if (exists) {
          const confirm2 = window.confirm(`A widget with ID "${this.template.id}" already exists in the gallery. Overwrite?`);
          if (!confirm2) return;
        }
      }
      if (this.originalId && this.originalId !== this.template.id) {
        await this.plugin.deleteFromGallery(this.originalId);
      }
      await this.plugin.saveToGallery(this.template);
      new import_obsidian.Notice(this.plugin.t("widgetSaved"));
      this.onSave(this.template);
      this.close();
    };
  }
  renderVisualEditor(container) {
    const header = container.createDiv({ cls: "visual-editor-header" });
    header.createEl("h3", { text: this.plugin.t("detectedVariables") });
    const actions = header.createDiv({ cls: "visual-header-actions" });
    const resetAllBtn = actions.createEl("button", { text: "\u{1F504} Reset All", cls: "clickable-icon" });
    resetAllBtn.title = "Reset all visual styles to initial state";
    resetAllBtn.onclick = () => {
      if (window.confirm("Reset all visual styles to initial state?")) {
        this.template.css = this.initialCss;
        this.renderEditor();
        this.updatePreview();
      }
    };
    const magicBtn = actions.createEl("button", { text: "\u2728 Magic Scan", cls: "clickable-icon" });
    magicBtn.title = "Scan for hardcoded values and convert to variables";
    magicBtn.onclick = () => {
      this.magicScanAndInject();
      this.renderEditor();
    };
    const addVarBtn = actions.createEl("button", { text: "\u2795", cls: "clickable-icon" });
    addVarBtn.title = "Add new variable";
    addVarBtn.onclick = () => this.promptAddVariable(container);
    const scrollArea = container.createDiv({ cls: "visual-variables-list" });
    this.renderVariablesList(scrollArea);
  }
  renderVariablesList(container) {
    container.empty();
    const css = this.template.css;
    const variablesMap = /* @__PURE__ */ new Map();
    const defRegex = /(--[a-zA-Z0-9_-]+)\s*:\s*([^;]+);/g;
    let match;
    while ((match = defRegex.exec(css)) !== null) {
      variablesMap.set(match[1], { value: match[2].trim(), isDefined: true });
    }
    const usageRegex = /var\((--[a-zA-Z0-9_-]+)\)/g;
    usageRegex.lastIndex = 0;
    while ((match = usageRegex.exec(css)) !== null) {
      if (!variablesMap.has(match[1])) {
        variablesMap.set(match[1], { value: "", isDefined: false });
      }
    }
    const genericVarRegex = /(--[a-zA-Z0-9_-]+)/g;
    genericVarRegex.lastIndex = 0;
    while ((match = genericVarRegex.exec(css)) !== null) {
      if (!variablesMap.has(match[1])) {
        variablesMap.set(match[1], { value: "", isDefined: false });
      }
    }
    if (variablesMap.size === 0) {
      const emptyState = container.createDiv({ cls: "visual-empty-state" });
      emptyState.createEl("p", {
        text: "No CSS variables detected. Use the Magic Scan button above to automatically convert your CSS to visual controls.",
        cls: "mod-muted"
      });
      return;
    }
    const sortedVars = Array.from(variablesMap.entries()).sort((a, b) => {
      if (a[1].isDefined && !b[1].isDefined) return -1;
      if (!a[1].isDefined && b[1].isDefined) return 1;
      return a[0].localeCompare(b[0]);
    });
    sortedVars.forEach(([name, info]) => {
      const s = new import_obsidian.Setting(container).setName(name.replace("--", "").replace(/-/g, " "));
      s.settingEl.onmouseenter = () => this.highlightVariable(name);
      s.settingEl.onmouseleave = () => this.clearHighlight();
      const val = info.value.toLowerCase();
      const n = name.toLowerCase();
      const isColor = (varName, varVal) => {
        const colorKeywords = ["color", "bg", "background", "accent", "text", "border", "shadow", "fill", "stroke"];
        const v = varVal.toLowerCase();
        if (varName.includes("size") || varName.includes("padding") || varName.includes("margin") || varName.includes("radius") || varName.includes("gap")) return false;
        return colorKeywords.some((k) => varName.toLowerCase().includes(k)) || v.startsWith("#") || v.startsWith("rgb") || v.startsWith("hsl") || v === "transparent";
      };
      if (!info.isDefined) {
        s.setDesc("Theme variable. Override it?");
        s.addButton((btn) => btn.setButtonText("Override").onClick(() => {
          let defaultValue = "inherit";
          if (isColor(name, "")) defaultValue = "#ffffff";
          else if (n.includes("size") || n.includes("padding") || n.includes("margin")) defaultValue = "1rem";
          else if (n.includes("radius")) defaultValue = "8px";
          this.updateCssVariable(name, defaultValue);
          this.renderEditor();
        }));
        return;
      }
      if (n.includes("display")) {
        s.addDropdown((d) => d.addOptions({ "block": "block", "flex": "flex", "grid": "grid", "inline-block": "inline-block", "none": "none" }).setValue(val).onChange((v) => this.updateCssVariable(name, v)));
      } else if (n.includes("flex-direction")) {
        s.addDropdown((d) => d.addOptions({ "row": "row", "column": "column", "row-reverse": "row-reverse", "column-reverse": "column-reverse" }).setValue(val).onChange((v) => this.updateCssVariable(name, v)));
      } else if (n.includes("align-items") || n.includes("justify-content")) {
        s.addDropdown((d) => d.addOptions({ "center": "center", "flex-start": "start", "flex-end": "end", "space-between": "between", "space-around": "around" }).setValue(val).onChange((v) => this.updateCssVariable(name, v)));
      } else if (n.includes("font-weight")) {
        s.addDropdown((d) => d.addOptions({ "normal": "normal", "bold": "bold", "100": "100", "300": "300", "400": "400", "500": "500", "600": "600", "700": "700", "900": "900" }).setValue(val).onChange((v) => this.updateCssVariable(name, v)));
      } else if (isColor(name, info.value)) {
        s.addColorPicker((color) => color.setValue(val.includes("var(") ? "#ffffff" : info.value).onChange((v) => this.updateCssVariable(name, v)));
      } else if (val.includes("px") || val.includes("rem") || val.includes("%") || val.includes("em") || /^-?\d+\.?\d*$/.test(val)) {
        const numMatch = val.match(/(-?\d+\.?\d*)/);
        const unit = val.replace(/[0-9.-]/g, "").trim() || (n.includes("weight") ? "" : "px");
        const currentVal = numMatch ? parseFloat(numMatch[0]) : 0;
        const valueInput = s.controlEl.createEl("input", {
          type: "text",
          cls: "slider-value-input",
          value: info.value
        });
        s.addSlider((slider) => {
          slider.setLimits(0, unit === "%" ? 100 : unit === "rem" || unit === "em" ? 10 : unit === "" ? 900 : 200, unit === "rem" || unit === "em" ? 0.1 : unit === "" ? 100 : 1).setValue(currentVal).onChange((v) => {
            const newVal = `${v}${unit}`;
            valueInput.value = newVal;
            this.updateCssVariable(name, newVal);
          });
          valueInput.oninput = (e) => {
            const inputVal = e.target.value;
            const match2 = inputVal.match(/(-?\d+\.?\d*)/);
            if (match2) {
              const num = parseFloat(match2[0]);
              slider.setValue(num);
              this.updateCssVariable(name, inputVal);
            }
          };
        });
      } else {
        s.addText((text) => text.setValue(info.value).onChange((v) => this.updateCssVariable(name, v)));
      }
      if (this.initialVariables.has(name)) {
        s.addExtraButton((btn) => btn.setIcon("reset").setTooltip("Reset to initial value").onClick(() => {
          this.updateCssVariable(name, this.initialVariables.get(name));
          this.renderEditor();
        }));
      }
      s.addExtraButton((btn) => btn.setIcon("trash").setTooltip("Remove variable").onClick(() => {
        this.removeCssVariable(name);
        this.renderEditor();
      }));
    });
  }
  highlightVariable(name) {
    if (!this.previewEl || !this.previewEl.shadowRoot) return;
    const shadow = this.previewEl.shadowRoot;
    const css = this.template.css;
    const selectors = [];
    const blockRegex = /([^{}]+)\{[^{}]*var\(\s*name\s*\)[^{}]*\}/g.source.replace("name", name);
    const regex = new RegExp(blockRegex, "g");
    let match;
    while ((match = regex.exec(css)) !== null) {
      const sel = match[1].trim();
      sel.split(",").forEach((s) => {
        const trimmed = s.trim();
        if (trimmed) selectors.push(trimmed);
      });
    }
    if (selectors.length === 0) return;
    selectors.forEach((selector) => {
      try {
        if (selector === ":host") {
          const content = shadow.querySelector(".widget-content");
          if (content) content.classList.add("widget-visual-highlight");
        } else {
          const elements = shadow.querySelectorAll(selector);
          elements.forEach((el) => el.classList.add("widget-visual-highlight"));
        }
      } catch (e) {
      }
    });
  }
  clearHighlight() {
    if (!this.previewEl || !this.previewEl.shadowRoot) return;
    const shadow = this.previewEl.shadowRoot;
    shadow.querySelectorAll(".widget-visual-highlight").forEach((el) => {
      el.classList.remove("widget-visual-highlight");
    });
  }
  magicScanAndInject() {
    let css = this.template.css;
    const hostMatch = css.match(/:host\s*\{([\s\S]*?)\}/);
    let hostContent = hostMatch ? hostMatch[1] : "";
    let restOfCss = css.replace(/:host\s*\{[\s\S]*?\}/, "");
    const replacements = [];
    const valueMap = /* @__PURE__ */ new Map();
    const propRegex = /(padding(?:-top|-bottom|-left|-right)?|margin(?:-top|-bottom|-left|-right)?|border-radius|background(?:-color)?|color|font-size|font-weight|gap|width|height|max-width|max-height|min-width|min-height|flex|line-height|letter-spacing|box-shadow|opacity|outline|border(?:-color|-width)?|display|flex-direction|align-items|justify-content|text-align|text-transform|overflow(?:-x|-y)?|cursor|transition|z-index)\s*:\s*([^;!{}]+);/g;
    let match;
    while ((match = propRegex.exec(restOfCss)) !== null) {
      const prop = match[1];
      const val = match[2].trim();
      if (val.includes("var(")) continue;
      const key = `${prop}:${val}`;
      if (!valueMap.has(key)) {
        const existingVarMatch = hostContent.match(new RegExp(`(--[a-zA-Z0-9_-]+)\\s*:\\s*${val.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*;`));
        if (existingVarMatch) {
          valueMap.set(key, existingVarMatch[1]);
        } else {
          const index = valueMap.size + 1;
          const varName = `--w-${prop.replace(/[^a-zA-Z0-9]/g, "-")}-${index}`;
          valueMap.set(key, varName);
          replacements.push({ prop, val, varName });
        }
      }
    }
    if (replacements.length === 0 && valueMap.size === 0) {
      this.injectCommonVariables();
      return;
    }
    if (replacements.length > 0) {
      const newVars = replacements.map((r) => `    ${r.varName}: ${r.val};`).join("\n");
      if (!hostMatch) {
        css = `:host {
${newVars}
}
` + css;
      } else {
        css = css.replace(/:host\s*\{/, `:host {
${newVars}
`);
      }
    }
    valueMap.forEach((varName, key) => {
      const [prop, val] = key.split(":");
      const escapedVal = val.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const rRegex = new RegExp(`${prop}\\s*:\\s*${escapedVal}\\s*;`, "g");
      restOfCss = restOfCss.replace(rRegex, `${prop}: var(${varName});`);
    });
    if (hostMatch) {
      const updatedHostMatch = css.match(/:host\s*\{([\s\S]*?)\}/);
      const updatedHostBlock = updatedHostMatch ? updatedHostMatch[0] : "";
      this.template.css = updatedHostBlock + "\n" + restOfCss;
    } else {
      this.template.css = css;
    }
    this.updatePreview();
  }
  removeCssVariable(name) {
    const regex = new RegExp(`${name}\\s*:\\s*([^;]+);\\n?`, "g");
    this.template.css = this.template.css.replace(regex, "");
    this.updatePreview();
  }
  injectCommonVariables() {
    const commonVars = `
:host {
    --widget-bg: var(--background-secondary);
    --widget-accent: var(--interactive-accent);
    --widget-radius: 12px;
    --widget-padding: 1rem;
    --widget-text: var(--text-normal);
}
`;
    if (!this.template.css.includes(":host")) {
      this.template.css = commonVars + this.template.css;
    } else {
      this.template.css = this.template.css.replace(":host {", `:host {
    --widget-bg: var(--background-secondary);
    --widget-accent: var(--interactive-accent);
    --widget-radius: 12px;
    --widget-padding: 1rem;
    --widget-text: var(--text-normal);`);
    }
    this.updatePreview();
  }
  promptAddVariable(container) {
    const name = prompt("Variable name (e.g. --my-color):", "--");
    if (name && name.startsWith("--")) {
      const value = prompt("Initial value (e.g. #ff0000 or 10px):", "#");
      if (value) {
        if (!this.template.css.includes(":host")) {
          this.template.css = `:host {
    ${name}: ${value};
}
` + this.template.css;
        } else {
          this.template.css = this.template.css.replace(":host {", `:host {
    ${name}: ${value};`);
        }
        this.renderEditor();
        this.updatePreview();
      }
    }
  }
  updateCssVariable(name, value) {
    const regex = new RegExp(`(${name}\\s*:\\s*)([^;]+);`, "g");
    if (regex.test(this.template.css)) {
      this.template.css = this.template.css.replace(regex, `$1${value};`);
    } else {
      if (!this.template.css.includes(":host")) {
        this.template.css = `:host {
    ${name}: ${value};
}
` + this.template.css;
      } else {
        this.template.css = this.template.css.replace(":host {", `:host {
    ${name}: ${value};`);
      }
    }
    this.updatePreview(true);
  }
  updatePreview(onlyCss = false) {
    if (!this.previewEl) return;
    let shadow = this.previewEl.shadowRoot;
    if (!shadow) {
      shadow = this.previewEl.attachShadow({ mode: "open" });
    }
    let styleEl = shadow.querySelector("style");
    if (!styleEl) {
      styleEl = document.createElement("style");
      shadow.appendChild(styleEl);
    }
    styleEl.textContent = `
            :host { display: block; background: var(--background-primary); padding: 20px; border-radius: 8px; min-height: 100%; color: var(--text-normal); }
            ${this.template.css}
            
            /* Highlight styles */
            .widget-visual-highlight {
                outline: 2px solid var(--interactive-accent) !important;
                outline-offset: 2px !important;
                box-shadow: 0 0 0 4px rgba(var(--interactive-accent-rgb), 0.4) !important;
                transition: outline 0.2s ease, box-shadow 0.2s ease !important;
                z-index: 10000 !important;
            }
        `;
    if (onlyCss) return;
    let contentEl = shadow.querySelector(".widget-content");
    if (contentEl) contentEl.remove();
    contentEl = document.createElement("div");
    contentEl.className = "widget-content";
    contentEl.innerHTML = this.template.html;
    shadow.appendChild(contentEl);
    this.runPreviewJs(shadow);
  }
  runPreviewJs(shadow) {
    const jsContent = this.template.js;
    if (!jsContent || !jsContent.trim()) return;
    try {
      const apiProxy = {
        root: shadow,
        data: this.template.data || {},
        saveState: async (newData) => {
          this.template.data = newData;
        },
        getState: () => this.template.data || {},
        getWidgetState: (id) => Promise.resolve({}),
        updateWidgetState: (id, data) => Promise.resolve(),
        getNoteState: () => Promise.resolve({}),
        updateNoteState: (data) => Promise.resolve(),
        t: (key, ...args) => this.plugin.t(key, ...args)
      };
      const functionNames = [];
      const functionRegex = /(?:async\s+)?function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g;
      let match;
      while ((match = functionRegex.exec(jsContent)) !== null) {
        if (match[1] !== "init") functionNames.push(match[1]);
      }
      if (/function\s+init\s*\(/.test(jsContent)) functionNames.push("init");
      const functionExports = functionNames.map(
        (name) => `if (typeof ${name} === 'function') api.${name} = ${name};`
      ).join("\n");
      const wrappedScript = `
                ${jsContent}
                try { ${functionExports} } catch(e) {}
            `;
      const scriptFunction = new Function("api", `with(api) { ${wrappedScript} }`);
      scriptFunction(apiProxy);
      this.plugin.bindEvents(shadow, apiProxy);
    } catch (e) {
      console.error("Preview JS Error:", e);
    }
  }
  createEditorField(container, name, value, onChange) {
    const wrap = container.createDiv({ cls: "editor-field-wrap" });
    wrap.createEl("label", { text: name });
    const area = wrap.createEl("textarea");
    area.value = value;
    area.oninput = (e) => onChange(e.target.value);
    return area;
  }
};
var WidgetSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: this.plugin.t("settingsTitle") });
    new import_obsidian.Setting(containerEl).setName(this.plugin.t("settingsLanguage")).setDesc(this.plugin.t("settingsLanguageDesc")).addDropdown((dropdown) => dropdown.addOption("en", "English").addOption("fr", "Fran\xE7ais").addOption("es", "Espa\xF1ol").addOption("de", "Deutsch").addOption("pt", "Portugu\xEAs").setValue(this.plugin.settings.language).onChange(async (value) => {
      this.plugin.settings.language = value;
      await this.plugin.saveSettings();
      this.display();
    }));
    new import_obsidian.Setting(containerEl).setName(this.plugin.t("settingsGalleryPath")).setDesc(this.plugin.t("settingsGalleryPathDesc")).addText((text) => text.setValue(this.plugin.settings.galleryPath).onChange(async (value) => {
      this.plugin.settings.galleryPath = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(containerEl).setName(this.plugin.t("settingsShowDataFiles")).setDesc(this.plugin.t("settingsShowDataFilesDesc")).addToggle((toggle) => toggle.setValue(this.plugin.settings.showDataFiles).onChange(async (value) => {
      this.plugin.settings.showDataFiles = value;
      await this.plugin.saveSettings();
    }));
    new import_obsidian.Setting(containerEl).setName(this.plugin.t("settingsMaxWidth")).setDesc(this.plugin.t("settingsMaxWidthDesc")).addDropdown((dropdown) => dropdown.addOption("percent", "%").addOption("pixel", "px").setValue(this.plugin.settings.maxWidthUnit).onChange(async (value) => {
      this.plugin.settings.maxWidthUnit = value;
      if (value === "percent") {
        this.plugin.settings.maxWidthValue = Math.min(this.plugin.settings.maxWidthValue, 100);
      } else {
        if (this.plugin.settings.maxWidthValue <= 100) {
          this.plugin.settings.maxWidthValue = 600;
        }
      }
      await this.plugin.saveSettings();
      this.display();
    })).addSlider((slider) => slider.setLimits(this.plugin.settings.maxWidthUnit === "percent" ? 10 : 200, this.plugin.settings.maxWidthUnit === "percent" ? 100 : 2e3, 5).setValue(this.plugin.settings.maxWidthValue).setDynamicTooltip().onChange(async (value) => {
      this.plugin.settings.maxWidthValue = value;
      await this.plugin.saveSettings();
      const view = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
      if (view) {
        view.previewMode?.rerender(true);
      }
    }));
    containerEl.createEl("hr");
    containerEl.createEl("h3", { text: "Community & Updates" });
    new import_obsidian.Setting(containerEl).setName(this.plugin.t("settingsGithub")).setDesc(this.plugin.t("settingsGithubDesc")).addButton((btn) => btn.setButtonText("GitHub").setCta().onClick(() => {
      window.open(this.plugin.settings.githubUrl, "_blank");
    }));
    new import_obsidian.Setting(containerEl).setName(this.plugin.t("syncGalleryBtn")).setDesc(this.plugin.t("syncGalleryDesc")).addButton((btn) => btn.setButtonText("Update").onClick(async () => {
      btn.setDisabled(true);
      btn.setButtonText("...");
      await this.plugin.syncGallery();
      btn.setDisabled(false);
      btn.setButtonText("Update");
    }));
    new import_obsidian.Setting(containerEl).setName(this.plugin.t("updatePlugin")).setDesc(this.plugin.t("updatePluginDesc")).addButton((btn) => btn.setButtonText(this.plugin.t("updatePluginBtn")).setCta().onClick(async () => {
      btn.setDisabled(true);
      btn.setButtonText("...");
      await this.plugin.updatePlugin();
      btn.setDisabled(false);
      btn.setButtonText(this.plugin.t("updatePluginBtn"));
    }));
    new import_obsidian.Setting(containerEl).setName(this.plugin.t("checkForUpdates")).setDesc(this.plugin.t("checkForUpdatesDesc")).addButton((btn) => btn.setButtonText("Check").onClick(async () => {
      btn.setDisabled(true);
      await this.plugin.checkForUpdates(false);
      btn.setDisabled(false);
    }));
    containerEl.createEl("hr");
    containerEl.createEl("h3", { text: "Maintenance" });
    new import_obsidian.Setting(containerEl).setName(this.plugin.t("updateAllWidgets")).setDesc(this.plugin.t("updateAllWidgetsDesc")).addButton((btn) => btn.setButtonText(this.plugin.t("updateAllWidgetsBtn")).setWarning().onClick(async () => {
      btn.setDisabled(true);
      const originalText = btn.buttonEl.innerText;
      btn.setButtonText("...");
      await this.plugin.updateAllWidgetsInVault();
      btn.setDisabled(false);
      btn.setButtonText(originalText);
    }));
  }
};
