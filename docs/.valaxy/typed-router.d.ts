/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// Generated by unplugin-vue-router. ‼️ DO NOT MODIFY THIS FILE ‼️
// It's recommended to commit this file.
// Make sure to add this file to your tsconfig.json file as an "includes" or "files" entry.

declare module 'vue-router/auto-routes' {
  import type {
    RouteRecordInfo,
    ParamValue,
    ParamValueOneOrMore,
    ParamValueZeroOrMore,
    ParamValueZeroOrOne,
  } from 'vue-router'

  /**
   * Route name map generated by unplugin-vue-router
   */
  export interface RouteNamedMap {
    '/': RouteRecordInfo<'/', '/', Record<never, never>, Record<never, never>>,
    '/[...path]': RouteRecordInfo<'/[...path]', '/:path(.*)', { path: ParamValue<true> }, { path: ParamValue<false> }>,
    '/api/': RouteRecordInfo<'/api/', '/api', Record<never, never>, Record<never, never>>,
    '/api/addon': RouteRecordInfo<'/api/addon', '/api/addon', Record<never, never>, Record<never, never>>,
    '/archives/': RouteRecordInfo<'/archives/', '/archives', Record<never, never>, Record<never, never>>,
    '/categories/': RouteRecordInfo<'/categories/', '/categories', Record<never, never>, Record<never, never>>,
    '/components/': RouteRecordInfo<'/components/', '/components', Record<never, never>, Record<never, never>>,
    '/components/SakuraArticle': RouteRecordInfo<'/components/SakuraArticle', '/components/SakuraArticle', Record<never, never>, Record<never, never>>,
    '/components/SakuraArticleCategories': RouteRecordInfo<'/components/SakuraArticleCategories', '/components/SakuraArticleCategories', Record<never, never>, Record<never, never>>,
    '/components/SakuraArticleCollapse': RouteRecordInfo<'/components/SakuraArticleCollapse', '/components/SakuraArticleCollapse', Record<never, never>, Record<never, never>>,
    '/components/SakuraArticleFooter': RouteRecordInfo<'/components/SakuraArticleFooter', '/components/SakuraArticleFooter', Record<never, never>, Record<never, never>>,
    '/components/SakuraArticleTags': RouteRecordInfo<'/components/SakuraArticleTags', '/components/SakuraArticleTags', Record<never, never>, Record<never, never>>,
    '/components/SakuraBackgroundDisplay': RouteRecordInfo<'/components/SakuraBackgroundDisplay', '/components/SakuraBackgroundDisplay', Record<never, never>, Record<never, never>>,
    '/components/SakuraBanner': RouteRecordInfo<'/components/SakuraBanner', '/components/SakuraBanner', Record<never, never>, Record<never, never>>,
    '/components/SakuraCard': RouteRecordInfo<'/components/SakuraCard', '/components/SakuraCard', Record<never, never>, Record<never, never>>,
    '/components/SakuraCategories': RouteRecordInfo<'/components/SakuraCategories', '/components/SakuraCategories', Record<never, never>, Record<never, never>>,
    '/components/SakuraCategory': RouteRecordInfo<'/components/SakuraCategory', '/components/SakuraCategory', Record<never, never>, Record<never, never>>,
    '/components/SakuraDate': RouteRecordInfo<'/components/SakuraDate', '/components/SakuraDate', Record<never, never>, Record<never, never>>,
    '/components/SakuraFooter': RouteRecordInfo<'/components/SakuraFooter', '/components/SakuraFooter', Record<never, never>, Record<never, never>>,
    '/components/SakuraFooterNavigation': RouteRecordInfo<'/components/SakuraFooterNavigation', '/components/SakuraFooterNavigation', Record<never, never>, Record<never, never>>,
    '/components/SakuraGlitchText': RouteRecordInfo<'/components/SakuraGlitchText', '/components/SakuraGlitchText', Record<never, never>, Record<never, never>>,
    '/components/SakuraHamburger': RouteRecordInfo<'/components/SakuraHamburger', '/components/SakuraHamburger', Record<never, never>, Record<never, never>>,
    '/components/SakuraLayoutPostTag': RouteRecordInfo<'/components/SakuraLayoutPostTag', '/components/SakuraLayoutPostTag', Record<never, never>, Record<never, never>>,
    '/components/SakuraLinks': RouteRecordInfo<'/components/SakuraLinks', '/components/SakuraLinks', Record<never, never>, Record<never, never>>,
    '/components/SakuraNavbar': RouteRecordInfo<'/components/SakuraNavbar', '/components/SakuraNavbar', Record<never, never>, Record<never, never>>,
    '/components/SakuraNavbarBrand': RouteRecordInfo<'/components/SakuraNavbarBrand', '/components/SakuraNavbarBrand', Record<never, never>, Record<never, never>>,
    '/components/SakuraNavLink': RouteRecordInfo<'/components/SakuraNavLink', '/components/SakuraNavLink', Record<never, never>, Record<never, never>>,
    '/components/SakuraNavLinkItem': RouteRecordInfo<'/components/SakuraNavLinkItem', '/components/SakuraNavLinkItem', Record<never, never>, Record<never, never>>,
    '/components/SakuraNetworkGraph': RouteRecordInfo<'/components/SakuraNetworkGraph', '/components/SakuraNetworkGraph', Record<never, never>, Record<never, never>>,
    '/components/SakuraNoticeBoard': RouteRecordInfo<'/components/SakuraNoticeBoard', '/components/SakuraNoticeBoard', Record<never, never>, Record<never, never>>,
    '/components/SakuraPageHeader': RouteRecordInfo<'/components/SakuraPageHeader', '/components/SakuraPageHeader', Record<never, never>, Record<never, never>>,
    '/components/SakuraSidebar': RouteRecordInfo<'/components/SakuraSidebar', '/components/SakuraSidebar', Record<never, never>, Record<never, never>>,
    '/components/SakuraSidebarCategory': RouteRecordInfo<'/components/SakuraSidebarCategory', '/components/SakuraSidebarCategory', Record<never, never>, Record<never, never>>,
    '/components/SakuraSidebarCategoryByName': RouteRecordInfo<'/components/SakuraSidebarCategoryByName', '/components/SakuraSidebarCategoryByName', Record<never, never>, Record<never, never>>,
    '/components/SakuraSideBarToggleButton': RouteRecordInfo<'/components/SakuraSideBarToggleButton', '/components/SakuraSideBarToggleButton', Record<never, never>, Record<never, never>>,
    '/components/SakuraSiteInfoCard': RouteRecordInfo<'/components/SakuraSiteInfoCard', '/components/SakuraSiteInfoCard', Record<never, never>, Record<never, never>>,
    '/components/SakuraSocialLinks': RouteRecordInfo<'/components/SakuraSocialLinks', '/components/SakuraSocialLinks', Record<never, never>, Record<never, never>>,
    '/components/SakuraTimeLine': RouteRecordInfo<'/components/SakuraTimeLine', '/components/SakuraTimeLine', Record<never, never>, Record<never, never>>,
    '/components/SakuraToc': RouteRecordInfo<'/components/SakuraToc', '/components/SakuraToc', Record<never, never>, Record<never, never>>,
    '/components/SakuraToTop': RouteRecordInfo<'/components/SakuraToTop', '/components/SakuraToTop', Record<never, never>, Record<never, never>>,
    '/components/SakuraTypewriter': RouteRecordInfo<'/components/SakuraTypewriter', '/components/SakuraTypewriter', Record<never, never>, Record<never, never>>,
    '/components/StarterAuthor': RouteRecordInfo<'/components/StarterAuthor', '/components/StarterAuthor', Record<never, never>, Record<never, never>>,
    '/components/StarterToggleLocale': RouteRecordInfo<'/components/StarterToggleLocale', '/components/StarterToggleLocale', Record<never, never>, Record<never, never>>,
    '/components/ValaxyCopyright': RouteRecordInfo<'/components/ValaxyCopyright', '/components/ValaxyCopyright', Record<never, never>, Record<never, never>>,
    '/components-custom/': RouteRecordInfo<'/components-custom/', '/components-custom', Record<never, never>, Record<never, never>>,
    '/components-custom/SakuraArticleFooterCustom': RouteRecordInfo<'/components-custom/SakuraArticleFooterCustom', '/components-custom/SakuraArticleFooterCustom', Record<never, never>, Record<never, never>>,
    '/components-custom/SakuraArticleListCustom': RouteRecordInfo<'/components-custom/SakuraArticleListCustom', '/components-custom/SakuraArticleListCustom', Record<never, never>, Record<never, never>>,
    '/components-custom/SakuraArticlePinnedCustom': RouteRecordInfo<'/components-custom/SakuraArticlePinnedCustom', '/components-custom/SakuraArticlePinnedCustom', Record<never, never>, Record<never, never>>,
    '/components-custom/SakuraBannerCustom': RouteRecordInfo<'/components-custom/SakuraBannerCustom', '/components-custom/SakuraBannerCustom', Record<never, never>, Record<never, never>>,
    '/components-custom/SakuraCommentCustom': RouteRecordInfo<'/components-custom/SakuraCommentCustom', '/components-custom/SakuraCommentCustom', Record<never, never>, Record<never, never>>,
    '/components-custom/SakuraFooterCustom': RouteRecordInfo<'/components-custom/SakuraFooterCustom', '/components-custom/SakuraFooterCustom', Record<never, never>, Record<never, never>>,
    '/components-custom/SakuraNavbarCustom': RouteRecordInfo<'/components-custom/SakuraNavbarCustom', '/components-custom/SakuraNavbarCustom', Record<never, never>, Record<never, never>>,
    '/components-custom/SakuraNoticeBoardCustom': RouteRecordInfo<'/components-custom/SakuraNoticeBoardCustom', '/components-custom/SakuraNoticeBoardCustom', Record<never, never>, Record<never, never>>,
    '/components-custom/SakuraPaginationCustom': RouteRecordInfo<'/components-custom/SakuraPaginationCustom', '/components-custom/SakuraPaginationCustom', Record<never, never>, Record<never, never>>,
    '/components-custom/SakuraSidebarCustom': RouteRecordInfo<'/components-custom/SakuraSidebarCustom', '/components-custom/SakuraSidebarCustom', Record<never, never>, Record<never, never>>,
    '/components-layout/': RouteRecordInfo<'/components-layout/', '/components-layout', Record<never, never>, Record<never, never>>,
    '/components-layout/SakuraAsideLayout': RouteRecordInfo<'/components-layout/SakuraAsideLayout', '/components-layout/SakuraAsideLayout', Record<never, never>, Record<never, never>>,
    '/components-layout/SakuraHomeLayout': RouteRecordInfo<'/components-layout/SakuraHomeLayout', '/components-layout/SakuraHomeLayout', Record<never, never>, Record<never, never>>,
    '/components-layout/SakuraMultiColumnsLayout': RouteRecordInfo<'/components-layout/SakuraMultiColumnsLayout', '/components-layout/SakuraMultiColumnsLayout', Record<never, never>, Record<never, never>>,
    '/components-themes/': RouteRecordInfo<'/components-themes/', '/components-themes', Record<never, never>, Record<never, never>>,
    '/components-themes/ArchivesThemeSakura': RouteRecordInfo<'/components-themes/ArchivesThemeSakura', '/components-themes/ArchivesThemeSakura', Record<never, never>, Record<never, never>>,
    '/components-themes/ArticleListThemeCard': RouteRecordInfo<'/components-themes/ArticleListThemeCard', '/components-themes/ArticleListThemeCard', Record<never, never>, Record<never, never>>,
    '/components-themes/ArticleListThemeGrid': RouteRecordInfo<'/components-themes/ArticleListThemeGrid', '/components-themes/ArticleListThemeGrid', Record<never, never>, Record<never, never>>,
    '/components-themes/ArticleListThemeMasonry': RouteRecordInfo<'/components-themes/ArticleListThemeMasonry', '/components-themes/ArticleListThemeMasonry', Record<never, never>, Record<never, never>>,
    '/components-themes/ArticleListThemeMinima': RouteRecordInfo<'/components-themes/ArticleListThemeMinima', '/components-themes/ArticleListThemeMinima', Record<never, never>, Record<never, never>>,
    '/components-themes/ArticleNavigationThemeMinimal': RouteRecordInfo<'/components-themes/ArticleNavigationThemeMinimal', '/components-themes/ArticleNavigationThemeMinimal', Record<never, never>, Record<never, never>>,
    '/components-themes/ArticleNavigationThemeSakura': RouteRecordInfo<'/components-themes/ArticleNavigationThemeSakura', '/components-themes/ArticleNavigationThemeSakura', Record<never, never>, Record<never, never>>,
    '/components-themes/ArticlePinnedThemeStartDash': RouteRecordInfo<'/components-themes/ArticlePinnedThemeStartDash', '/components-themes/ArticlePinnedThemeStartDash', Record<never, never>, Record<never, never>>,
    '/components-themes/ArticleThemeCard': RouteRecordInfo<'/components-themes/ArticleThemeCard', '/components-themes/ArticleThemeCard', Record<never, never>, Record<never, never>>,
    '/components-themes/ArticleThemeGrid': RouteRecordInfo<'/components-themes/ArticleThemeGrid', '/components-themes/ArticleThemeGrid', Record<never, never>, Record<never, never>>,
    '/components-themes/ArticleThemeMasonry': RouteRecordInfo<'/components-themes/ArticleThemeMasonry', '/components-themes/ArticleThemeMasonry', Record<never, never>, Record<never, never>>,
    '/components-themes/ArticleThemeMinima': RouteRecordInfo<'/components-themes/ArticleThemeMinima', '/components-themes/ArticleThemeMinima', Record<never, never>, Record<never, never>>,
    '/components-themes/CategoriesThemeSakura': RouteRecordInfo<'/components-themes/CategoriesThemeSakura', '/components-themes/CategoriesThemeSakura', Record<never, never>, Record<never, never>>,
    '/components-themes/CategoriesThemeYun': RouteRecordInfo<'/components-themes/CategoriesThemeYun', '/components-themes/CategoriesThemeYun', Record<never, never>, Record<never, never>>,
    '/components-themes/InfoOverlayThemeHero': RouteRecordInfo<'/components-themes/InfoOverlayThemeHero', '/components-themes/InfoOverlayThemeHero', Record<never, never>, Record<never, never>>,
    '/components-themes/InfoOverlayThemeSakura': RouteRecordInfo<'/components-themes/InfoOverlayThemeSakura', '/components-themes/InfoOverlayThemeSakura', Record<never, never>, Record<never, never>>,
    '/components-themes/LinksThemeYun': RouteRecordInfo<'/components-themes/LinksThemeYun', '/components-themes/LinksThemeYun', Record<never, never>, Record<never, never>>,
    '/components-themes/PaginationThemeInfiniteScroll': RouteRecordInfo<'/components-themes/PaginationThemeInfiniteScroll', '/components-themes/PaginationThemeInfiniteScroll', Record<never, never>, Record<never, never>>,
    '/components-themes/PaginationThemeValaxy': RouteRecordInfo<'/components-themes/PaginationThemeValaxy', '/components-themes/PaginationThemeValaxy', Record<never, never>, Record<never, never>>,
    '/components-themes/PostThemeSakura': RouteRecordInfo<'/components-themes/PostThemeSakura', '/components-themes/PostThemeSakura', Record<never, never>, Record<never, never>>,
    '/components-themes/SidebarThemeDynamic': RouteRecordInfo<'/components-themes/SidebarThemeDynamic', '/components-themes/SidebarThemeDynamic', Record<never, never>, Record<never, never>>,
    '/components-themes/SidebarThemeOverview': RouteRecordInfo<'/components-themes/SidebarThemeOverview', '/components-themes/SidebarThemeOverview', Record<never, never>, Record<never, never>>,
    '/components-themes/TagsThemeSakura': RouteRecordInfo<'/components-themes/TagsThemeSakura', '/components-themes/TagsThemeSakura', Record<never, never>, Record<never, never>>,
    '/components-themes/TagsThemeYun': RouteRecordInfo<'/components-themes/TagsThemeYun', '/components-themes/TagsThemeYun', Record<never, never>, Record<never, never>>,
    '/components-themes/WaveThemeFish': RouteRecordInfo<'/components-themes/WaveThemeFish', '/components-themes/WaveThemeFish', Record<never, never>, Record<never, never>>,
    '/components-themes/WaveThemeHorizontal': RouteRecordInfo<'/components-themes/WaveThemeHorizontal', '/components-themes/WaveThemeHorizontal', Record<never, never>, Record<never, never>>,
    '/components-themes/WaveThemeRipple': RouteRecordInfo<'/components-themes/WaveThemeRipple', '/components-themes/WaveThemeRipple', Record<never, never>, Record<never, never>>,
    '/components-themes/WaveThemeYunCloud': RouteRecordInfo<'/components-themes/WaveThemeYunCloud', '/components-themes/WaveThemeYunCloud', Record<never, never>, Record<never, never>>,
    '/config/': RouteRecordInfo<'/config/', '/config', Record<never, never>, Record<never, never>>,
    '/config/components': RouteRecordInfo<'/config/components', '/config/components', Record<never, never>, Record<never, never>>,
    '/config/overview': RouteRecordInfo<'/config/overview', '/config/overview', Record<never, never>, Record<never, never>>,
    '/config/site': RouteRecordInfo<'/config/site', '/config/site', Record<never, never>, Record<never, never>>,
    '/config/theme': RouteRecordInfo<'/config/theme', '/config/theme', Record<never, never>, Record<never, never>>,
    '/dev/': RouteRecordInfo<'/dev/', '/dev', Record<never, never>, Record<never, never>>,
    '/examples/': RouteRecordInfo<'/examples/', '/examples', Record<never, never>, Record<never, never>>,
    '/examples/config': RouteRecordInfo<'/examples/config', '/examples/config', Record<never, never>, Record<never, never>>,
    '/examples/gallery': RouteRecordInfo<'/examples/gallery', '/examples/gallery', Record<never, never>, Record<never, never>>,
    '/guide/': RouteRecordInfo<'/guide/', '/guide', Record<never, never>, Record<never, never>>,
    '/guide/installation': RouteRecordInfo<'/guide/installation', '/guide/installation', Record<never, never>, Record<never, never>>,
    '/guide/update': RouteRecordInfo<'/guide/update', '/guide/update', Record<never, never>, Record<never, never>>,
    '/layouts/': RouteRecordInfo<'/layouts/', '/layouts', Record<never, never>, Record<never, never>>,
    '/layouts/404': RouteRecordInfo<'/layouts/404', '/layouts/404', Record<never, never>, Record<never, never>>,
    '/layouts/archives': RouteRecordInfo<'/layouts/archives', '/layouts/archives', Record<never, never>, Record<never, never>>,
    '/layouts/categories': RouteRecordInfo<'/layouts/categories', '/layouts/categories', Record<never, never>, Record<never, never>>,
    '/layouts/default': RouteRecordInfo<'/layouts/default', '/layouts/default', Record<never, never>, Record<never, never>>,
    '/layouts/home': RouteRecordInfo<'/layouts/home', '/layouts/home', Record<never, never>, Record<never, never>>,
    '/layouts/links': RouteRecordInfo<'/layouts/links', '/layouts/links', Record<never, never>, Record<never, never>>,
    '/layouts/post': RouteRecordInfo<'/layouts/post', '/layouts/post', Record<never, never>, Record<never, never>>,
    '/layouts/tags': RouteRecordInfo<'/layouts/tags', '/layouts/tags', Record<never, never>, Record<never, never>>,
    '/page/[page]': RouteRecordInfo<'/page/[page]', '/page/:page', { page: ParamValue<true> }, { page: ParamValue<false> }>,
    '/posts/doc': RouteRecordInfo<'/posts/doc', '/posts/doc', Record<never, never>, Record<never, never>>,
    '/posts/doc2': RouteRecordInfo<'/posts/doc2', '/posts/doc2', Record<never, never>, Record<never, never>>,
    '/posts/doc3': RouteRecordInfo<'/posts/doc3', '/posts/doc3', Record<never, never>, Record<never, never>>,
    '/posts/doc4': RouteRecordInfo<'/posts/doc4', '/posts/doc4', Record<never, never>, Record<never, never>>,
    '/posts/doc5': RouteRecordInfo<'/posts/doc5', '/posts/doc5', Record<never, never>, Record<never, never>>,
    '/posts/doc6': RouteRecordInfo<'/posts/doc6', '/posts/doc6', Record<never, never>, Record<never, never>>,
    '/releases': RouteRecordInfo<'/releases', '/releases', Record<never, never>, Record<never, never>>,
    '/styles/': RouteRecordInfo<'/styles/', '/styles', Record<never, never>, Record<never, never>>,
    '/styles/animation': RouteRecordInfo<'/styles/animation', '/styles/animation', Record<never, never>, Record<never, never>>,
    '/styles/theming': RouteRecordInfo<'/styles/theming', '/styles/theming', Record<never, never>, Record<never, never>>,
    '/tags/': RouteRecordInfo<'/tags/', '/tags', Record<never, never>, Record<never, never>>,
  }
}
