export type ThemeAwsS3V2 = {
  schemaVersion: 2;
  design: DesignConfig;
  behavior: BehaviorConfig;
  content: Partial<Record<ContentKey, string>>;
  assets: Partial<Record<AssetKey, string>>;
};

// ============================================================================
// CATEGORIA A — DESIGN
// ============================================================================

type DesignConfig = {
  theme: ThemeIdentity;
  general: GeneralDesign;
  header: HeaderDesign;
  footer: FooterDesign;
  home: HomeDesign;
  search: SearchDesign;
  details: DetailsDesign;
  cards: CardsDesign;
  carousel?: CarouselDesign;
  buttons?: ButtonsDesign;
  formColors?: FormColorsDesign;
  creci?: CreciDesign;
  pages?: PagesDesign;
  condominium?: CondominiumDesign;
  propertyDetails?: PropertyDetailsDesign;
  searchUnderkating?: { textSearch?: boolean };
  groupInfoCard?: { inline?: boolean };
  blog?: { visible?: boolean };
};

type ThemeIdentity = {
  name?: ThemeName;
  tokens?: {
    colors?: {
      primary?: string;
      primarySearch?: string;
      border?: string;
      background?: string;
      surface?: string;
      backgroundSearch?: string;
      surfaceSearch?: string;
      surfaceDetails?: string;
      socialIcons?: string;
      accent?: string;
      text?: string;
      textMuted?: string;
    };
    spacing?: {
      cardGap?: string;
      sectionPadding?: string;
    };
    typography?: {
      fontFamily?: string;
      headingWeight?: "normal" | "medium" | "bold";
    };
  };
};

type GeneralDesign = {
  globalStyles?: {
    paginationColor?: string;
    tab?: {
      roundedTop?: boolean;
      marginTop?: boolean;
      backgroundColor?: string;
      borderColor?: string;
      disabledBorderColor?: string;
      disabledBackgroundColor?: string;
      textColor?: string;
      disabledTextColor?: string;
    };
    separator?: { backgroundColor?: string };
    ctaButton?: { backgroundColor?: string; color?: string };
  };
  layout?: {
    homeSvgBackground?: boolean;
    separatorVisible?: boolean;
    phone1DisplayType?: "default" | "list";
    map?: {
      withoutText?: boolean;
      noCircle?: boolean;
    };
    iptuWithMonthText?: boolean;
    rentWithMonthText?: boolean;
    imageWithBorder?: boolean;
    withPriceTable?: boolean;
    withWhatsappButton?: boolean;
    whatsappButtonSize?: "small" | "medium" | "large";
    thumbnailCarouselSecondLayout?: boolean;
    slidePropertyDetails?: "full-width" | "default-width";
  };
};

type HeaderDesign = {
  disableItemBackground?: boolean;
  itemWithPrimaryColorBg?: boolean;
  insideBanner?: boolean;
  itemWithBgBlack?: boolean;
  hiddenAboutUs?: boolean;
  hiddenSimulateFinancing?: boolean;
  hiddenJoinUs?: boolean;
  padding?: string;
  paddingY?: string;
  shrinkOnScroll?: boolean;
  transparentHeaderOnScroll?: boolean;
  secondaryLayout?: boolean;
  secondaryLayoutAttila?: boolean;
  compact?: boolean;
  withRounded?: boolean;
  attilaLayout?: boolean;
  lateralMargin?: boolean;
  backgroundColor?: string;
  height?: string;
  logo?: {
    centralizedContent?: boolean;
    position?: "center" | "left";
    width?: string;
    internalLogo?: { fullWidth?: boolean };
  };
  mobile?: {
    designClean?: boolean;
    backButton?: boolean;
    height?: string;
    whatsappColor?: string;
    menuHamburgerColor?: string;
    shrinkOnScroll?: boolean;
    logo?: { width?: string; internalLogo?: { fullWidth?: boolean } };
  };
  menu?: {
    followUs?: { icon?: string };
    color?: string;
    icon?: string;
    hoverColor?: string;
    hoverBackground?: string;
    whatsapp?: {
      designClean?: boolean;
      fill?: boolean;
      withBorder?: boolean;
      borderColor?: string;
    };
  };
  subMenu?: {
    desktop?: { designClean?: boolean };
    backgroundColor?: string;
  };
  mainMenu?: {
    searchBoxCode?: { visible?: boolean };
    withSocialIcons?: boolean;
    phoneNumber?: boolean;
    aboutUs?: MenuItemDesign;
    home?: MenuItemDesign;
    work?: MenuItemDesign;
    advertiseYourProperty?: MenuItemDesign;
    facilities?: MenuItemDesign;
    customerArea?: MenuItemDesign;
    favoritesObj?: MenuItemDesign;
    call?: MenuItemDesign;
    realEstatePhone?: MenuItemDesign;
    favorites?: string;
    whatsapp?: string;
  };
};

type MenuItemDesign = {
  visible?: boolean;
  href?: string;
  target?: "_blank" | "_self";
  ariaLabel?: string;
  onClick?: boolean;
};

type FooterDesign = {
  borderTop?: boolean;
  colorTitle?: string;
  color?: string;
  socialLinksColor?: string;
  phoneList?: boolean;
  socialLinks?: { instagram?: { withUsernameText?: boolean } };
  hiddenOpeningHours?: boolean;
  hiddenReclameAqui?: boolean;
  hiddenWorkingWithUs?: boolean;
  logoBody?: boolean;
  secondaryLayoutAttila?: boolean;
  secondaryLayout?: boolean;
  design?: "attila" | "default";
  contentAlign?: "left" | "center" | "right";
  alignContent?: "left" | "center" | "right";
  fontSizeSlogan?: string;
  sloganBold?: boolean;
  sloganUpperCase?: boolean;
  sloganBackgroundColor?: string;
  sloganColor?: string;
  backgroundColor?: string;
  itemBackgroundColor?: string;
  itemBorderColor?: string;
  subFooter?: { backgroundColor?: string };
  logo?: {
    width?: string;
    internalLogo?: { fullWidth?: boolean };
  };
  mobile?: {
    logo?: { width?: string; internalLogo?: { fullWidth?: boolean } };
  };
  mainMenu?: {
    advertiseYourProperty?: { visible?: boolean };
    orderProperty?: { visible?: boolean };
  };
  menu?: {
    showTitles?: boolean;
  };
};

type HomeDesign = {
  sections?: HomeSectionConfig[];
  banner?: HomeBannerDesign;
  highlight1?: HighlightSectionDesign;
  highlight2?: HighlightSectionDesign;
  highlight3?: HighlightSectionDesign;
  highlight4?: HighlightSectionDesign;
  highlight5?: HighlightSectionDesign;
  miniBanner?: MiniBannerDesign;
  testimonials?: TestimonialsDesign;
  aboutUs?: AboutUsDesign;
  sectionBlog?: { visible?: boolean };
  speakConsultant?: { visible?: boolean };
  institutional?: { visible?: boolean };
  linkForms?: { visible?: boolean };
  sectionText?: { visible?: boolean };
  bannerNewsletter?: {
    visible?: boolean;
    placeholderColor?: string;
    colorIcon?: string;
  };
  instagramNews?: { visible?: boolean };
  advisory?: { visible?: boolean };
  brokers?: { visible?: boolean };
  showQRCode?: boolean;
  featuredOpacity?: number;
  condominiumManagement?: {
    visible?: boolean;
  };
  simulateFinancingBanner?: {
    visible?: boolean;
    design?: "default" | "secondary";
    color?: string;
    button?: { backgroundColor?: string; color?: string };
  };
  groupCards?: {
    iconColor?: string;
    iconBackgroundColor?: string;
    slidesPerViewMd?: number;
    slidesPerViewLg?: number;
    secondaryLayout?: boolean;
    visible?: boolean;
  };
  neighborhoodBlock?: {
    visible?: boolean;
  };
  sectionProcess?: {
    backgroundColor?: string;
    visible?: boolean;
  };
  secondaryBlockWords?: {
    secondaryLayout?: boolean;
    visible?: boolean;
    withBorder?: boolean;
    titleSize?: string;
    titleMarginBottom?: string;
    titleAlign?: "left" | "center" | "right";
    titleWeight?: "bold" | "normal";
  };
  blockWords?: {
    backgroundColor?: string;
    color?: string;
    borderColor?: string;
    marginBottom?: boolean;
    secondaryLayout?: boolean;
    visible?: boolean;
    withBorder?: boolean;
    titleSize?: string;
    titleMarginBottom?: string;
    titleAlign?: "left" | "center" | "right";
    titleWeight?: "bold" | "normal";
  };
  promotionalBanner?: {
    visible?: boolean;
    backgroundColor?: string;
    heightBanner?: string;
  };
  bannerSci?: {
    marginTop?: boolean;
    design?: string;
    visible?: boolean;
    mobile?: { visible?: boolean };
  };
  companysForFinancing?: {
    visible?: boolean;
    secondaryLayout?: boolean;
    color?: string;
    uppercase?: boolean;
  };
  onlyNeighborhood?: { visible?: boolean; primaryColor?: boolean };
  onlyCity?: { visible?: boolean; backgroundColor?: string };
  quickAccess?: { backgroundColor?: string };
  bannerAds?: {
    visible?: boolean;
    textAlign?: "left" | "center" | "right";
  };
  secondaryBanner?: {
    visible?: boolean;
  };
  brokerPresentation?: {
    visible?: boolean;
    marginBottom?: boolean;
  };
};

type HomeSectionConfig = {
  type:
    | "banner"
    | "highlight1"
    | "highlight2"
    | "highlight3"
    | "highlight4"
    | "highlight5"
    | "miniBanner"
    | "testimonials"
    | "aboutUs"
    | "sectionProcess"
    | "blockWords"
    | "secondaryBlockWords"
    | "companysForFinancing"
    | "neighborhoodBlock"
    | "brokerPresentation"
    | "groupCards"
    | "promotionalBanner"
    | "bannerSci"
    | "bannerAds"
    | "secondaryBanner"
    | "sectionBlog"
    | "instagramNews"
    | "bannerNewsletter"
    | "simulateFinancingBanner"
    | "customPropertyCards";
  visible: boolean;
};

type HomeBannerDesign = {
  widthEntireBox?: boolean;
  gapTitle?: string;
  fontBoldTitle?: boolean;
  contentHeight?: string;
  colorSecondaryPhrase?: string;
  withLetters?: boolean;
  sectionHeader?: boolean;
  withImageLetters?: boolean;
  design?: "default" | "compact";
  noMarginTop?: boolean;
  withParallax?: boolean;
  fullWidth?: boolean;
  hiddenSecondaryPhrase?: boolean;
  secondaryLayout?: boolean;
  marginBottom?: boolean;
  fontSizeTitle?: string;
  filterBarDesign?: "kozmab" | "attila";
  withAboutUs?: boolean;
  attilaLayout?: boolean;
  filterBar?: "center";
  compactLayout?: boolean;
  menuAlign?: "left" | "center" | "right";
  withTitle?: boolean;
  alignContent?: "left" | "center" | "right";
  height?: "fullscreen" | "normal";
  colorTitle?: string;
  textShadow?: boolean;
  titleAlign?: "left" | "center" | "right";
  marginTop?: string;
  searchBoxProperties?: {
    design?: "default" | "secondary";
    backgroundColor?: string;
    backgroundColorSecondary?: boolean;
    withBorder?: boolean;
    button?: { color?: string };
    select?: { backgroundColor?: string; arrowColor?: string; color?: string };
  };
  mobile?: {
    searchBox?: { secondaryLayout?: boolean };
    filterBar?: "center";
    height?: string;
    titleAlign?: "left" | "center" | "right";
    isRoundedButton?: boolean;
    marginTop?: string;
  };
};

type HighlightSectionDesign = {
  visible?: boolean;
  carousel?: boolean;
  grid?: boolean;
  fontBold?: boolean;
  roundedCard?: "default" | "large";
  hiddenTitle?: boolean;
  hiddenTitleSubtitle?: boolean;
  withTitleDash?: boolean;
  isPrimaryColor?: boolean;
  barBottom?: boolean;
  secondaryColor?: string;
  backgroundColorSection?: string;
  bulletPaginationColor?: string;
  typePagination?: "bullets" | "progressbar" | "dash";
  textAlign?: "left" | "center" | "right";
  colorTitle?: string;
  withTypes?: boolean;
  withBorder?: boolean;
  borderBottomTitle?: boolean;
  withBorderTitle?: boolean;
  releaseLayout?: boolean;
  withSubtext?: boolean;
  marginBottomTitle?: string;
  target?: "_self" | "_blank";
  fontFamily?: string;
  fontFamilySubtitle?: string;
  filterSecondLayout?: boolean;
  filterType?: "link" | "button";
  withCents?: boolean;
  buttonViewMore?: { backgroundColor?: string; color?: string };
  viewMoreFontBold?: boolean;
  viewMoreRounded?: boolean;
  viewMoreFill?: boolean;
  viewMoreWithBorder?: boolean;
  mobile?: { visible?: boolean };
};

type MiniBannerDesign = {
  visible?: boolean;
  designBulletPagination?: "default" | "secondary";
  fontBoldTitle?: boolean;
  borderTopTitle?: boolean;
  colorTitle?: string;
  withTitleDash?: boolean;
  primaryRank?: boolean;
  textAlign?: "left" | "center" | "right";
  hiddenTitle?: boolean;
  withEffectHover?: boolean;
  carousel?: boolean;
  titleBottom?: boolean;
  fontSizeTitle?: string;
  marginBottom?: string;
  slidesPerView?: number;
  width?: string;
  height?: string;
  withText?: boolean;
  typeMiniBanner?: "grid" | "carousel";
  mobile?: { gridColumns?: string; width?: string; height?: string };
};

type TestimonialsDesign = {
  visible?: boolean;
  color?: string;
  borderTopColor?: string;
  backgroundColor?: string;
  marginBottom?: boolean;
  titleColor?: string;
  textColor?: string;
  backgroundColorCard?: string;
  backgroundColorBottomEdge?: string;
  borderColor?: string;
  layout?: "default" | "live";
  withBackgroundImage?: boolean;
  avatarColor?: string;
  withStars?: boolean;
  coloredBorderSticker?: string;
  showAvatar?: boolean;
  hiddenSubtitle?: boolean;
  mobile?: { hiddenSubtitle?: boolean };
  card?: { design?: "default" | "capital" };
  design?: "attila" | "default" | "imperio" | "puchille" | "clean" | "google";
};

type AboutUsDesign = {
  visible?: boolean;
  backgroundColor?: string;
  colorText?: string;
  hiddenCreci?: boolean;
  hiddenSubtitle?: boolean;
  highlightTitlesColor?: string;
  design?: "default" | "clean" | "full" | "compact";
  visibleButton?: boolean;
  fontFamily?: string;
  colorTitle?: string;
  reverseLayout?: boolean;
  fontSizeTitle?: string;
  isArray?: boolean;
};

type SearchDesign = {
  changeCardColor?: boolean;
  changeLayout?: { backgroundColor?: string };
  bgOpacity?: boolean;
  roundSelects?: boolean;
  blurFilters?: boolean;
  textSearch?: boolean;
  mobile?: {
    negotiation?: boolean;
    city?: boolean;
    textSearch?: boolean;
    value?: boolean;
    neighborhood?: boolean;
  };
  visible?: {
    groupValues?: boolean;
    negotiation?: boolean;
    type?: boolean;
    city?: boolean;
    neighborhood?: boolean;
  };
};

type DetailsDesign = {
  backgroundColor?: string;
  color?: string;
  secondaryLayout?: boolean;
  withMap?: boolean;
  withMapCondominiumPage?: boolean;
  highlight?: string;
  videoFirst?: boolean;
  showMap?: boolean;
  sidebarPropertyBackgroundColor?: string;
  sidebarPropertyColor?: string;
  btn1?: DetailsBtnDesign;
  btn2?: DetailsBtnDesign;
  btn3?: DetailsBtnDesign;
  btn4?: DetailsBtnDesign;
  btn5?: DetailsBtnDesign;
};

type DetailsBtnDesign = {
  visible?: boolean;
  borderColor?: string;
  backgroundColor?: string;
  color?: string;
  videoButton?: boolean;
  order?: number;
};

type CardsDesign = {
  videoTag?: { backgroundColor?: string };
  hiddenBorderTop?: boolean;
  hiddenSharedButton?: boolean;
  hiddenPagination?: boolean;
  buttonLinkColor?: string;
  buttonLinkRoundedFull?: boolean;
  buttonLinkBackgroundColor?: string;
  transparentBackground?: boolean;
  obsColor?: string;
  alignFavoriteButton?: "left" | "right";
  secondaryFeaturesGroup?: boolean;
  withTypeText?: boolean;
  withTypeTextSecondaryDesign?: boolean;
  colorTypeText?: string;
  backgroundColorSearch?: string;
  colorSearch?: string;
  backgroundColorTypeText?: string;
  positionFavoriteButton?: "internal" | "external";
  propertyCards?: {
    withBorder?: boolean;
    shadow?: "sm" | "md" | "lg";
    alignButtonSeeMore?: "left" | "center" | "right";
    codeSize?: "small" | "default";
    cardType?:
      | "compact"
      | "default"
      | "semi-compact"
      | "europe"
      | "attila-compact"
      | "imperio"
      | "puchille"
      | "mongagua"
      | "capital"
      | "clean"
      | "vastel"
      | "ventures"
      | "demax"
      | "dornelas";
    code?: { backgroundColor?: string; color?: string };
  };
  withCondominiumNameOnlySearch?: boolean;
  withCondominiumName?: boolean;
  invertCondominiumName?: boolean;
  hiddenCondominiumName?: boolean;
  iconLocation?: { color?: string; width?: number; height?: number };
  backgroundColor?: string;
  borderColor?: string;
  color?: string;
  codeDesignAttila?: boolean;
  heartColor?: string;
  shareColor?: string;
  withBorder?: boolean;
  withDescription?: boolean;
  secondaryLayout?: boolean;
  hiddenFeatures?: boolean;
  hiddenCondominium?: boolean;
  groupInfo?: { areaUseful?: boolean };
  withButtonViewMore?: boolean;
};

type CarouselDesign = {
  fullImage?: boolean;
  arrowLeftRight?: boolean;
  pagination?: boolean;
  bulletForArrow?: boolean;
};

type ButtonsDesign = {
  homeSearch?: {
    bold?: boolean;
  };
  viewMore?: {
    backgroundColor?: string;
    color?: string;
    bold?: boolean;
    fromText?: boolean;
    fullWidth?: boolean;
    roundedFull?: boolean;
    textUpperCase?: boolean;
  };
};

type FormColorsDesign = {
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
};

type CreciDesign = {
  hiddenCreci?: boolean;
  backgroundColor?: string;
  fontSize?: string;
  color?: string;
  fontBold?: boolean;
  paddingRight?: string;
  borderRadius?: string;
  borderTopLeftRadius?: string;
  borderBottomLeftRadius?: string;
  borderTopRightRadius?: string;
  borderBottomRightRadius?: string;
  mobile?: { hiddenCreci?: boolean; fontSize?: string };
};

type PagesDesign = {
  facilities?: string;
  favorites?: InternPageDesign;
  advertise?: InternPageDesign;
  order?: InternPageDesign;
  financing?: InternPageDesign;
  propertyDetails?: InternPageDesign;
  work?: InternPageDesign;
  call?: InternPageDesign;
  about?: InternPageDesign;
  contactUs?: InternPageDesign;
  privacyPolicy?: InternPageDesign;
  calculator?: InternPageDesign;
};

type InternPageDesign = {
  withoutInternalPadding?: boolean;
  secondaryLayoutClean?: boolean;
  sidebarBorderColor?: string;
  backgroundColor?: string;
  containerWithBg?: boolean;
  detailsWarehouse?: boolean;
  hiddenGroupImages?: boolean;
  design?: "clean" | "default";
  withForm?: boolean;
  defaultDesign?: boolean;
  withBackgroundTitle?: boolean;
  withBackgroundBanner?: boolean;
  alignTitle?: "left" | "center" | "right";
  secondaryLayout?: boolean;
  secondaryOnset?: boolean;
  secondaryLayoutOnset?: boolean;
  carousel?: { big_url?: string }[];
  designContainer?: "default" | "romero";
  groupCards?: {
    withBorder?: boolean;
    hiddenTitle?: boolean;
    hiddenHeaderSubtitle?: boolean;
  };
  sidebarProperty?: {
    shadow?: "sm" | "md" | "lg";
    logomarca?: boolean;
    logo?: string;
    whatsapp?: { number?: string };
  };
};

type CondominiumDesign = {
  titleWithBorder?: boolean;
};

type PropertyDetailsDesign = {
  withHorizontalBar?: boolean;
  codeButton?: { backgroundColor?: string };
  cardsProperty?: {
    obs?: { visible?: boolean };
    secondaryLayout?: boolean;
  };
};

// ============================================================================
// CATEGORIA B — REGRAS FUNCIONAIS (behavior)
// ============================================================================

type BehaviorConfig = {
  contact: ContactBehavior;
  features: GlobalFeaturesBehavior;
  advancedSearch: AdvancedSearchBehavior;
  search: SearchBehavior;
  details: DetailsBehavior;
  home: HomeBehavior;
  seo: SeoBehavior;
  integrations: IntegrationsBehavior;
  condominium: CondominiumBehavior;
};

type ContactBehavior = {
  whatsappNumber?: string;
  phoneNumber?: string;
  address?: string;
  socialLinks?: {
    tiktok?: string;
    blog?: string;
    x?: string;
  };
  footerPhone1Number?: string;
  footerPhone2Number?: string;
  footerAddressGoogleMaps?: string;
};

type GlobalFeaturesBehavior = {
  withChat?: boolean;
  withWeCallYou?: boolean;
  blogEnabled?: boolean;
  secondaryInstanceUrl?: string;
};

type AdvancedSearchBehavior = {
  typeWithSubtype?: boolean;
  typeIsMulti?: boolean;
  neighborhoodIsMulti?: boolean;
  neighborhoodWithCityName?: boolean;
  typeFinancing?: {
    onlyBanking?: boolean;
    withConstruction?: boolean;
  };
  advertisingStatus?: boolean;
  tour360?: boolean;
  showState?: boolean;
  typeOptionsOverride?: { label?: string; value?: string }[];
};

type SearchBehavior = {
  withCondominiumOptions?: boolean;
  negotiationPurposeOverride?: Record<string, string>;
};

type DetailsBehavior = {
  hiddenSeoBlock?: boolean;
  btn1IsWhatsappLink?: boolean;
  btn2IsWhatsappLink?: boolean;
  btn3IsWhatsappLink?: boolean;
  btn4IsWhatsappLink?: boolean;
  btn5IsWhatsappLink?: boolean;
};

type HomeBehavior = {
  banner?: {
    withAdvertisingStatusFilter?: boolean;
    withUnderkatingFilter?: boolean;
    withFilterMinAndMaxValue?: boolean;
    withCondominiumFilter?: boolean;
    withTags?: boolean;
    hiddenSearchCode?: boolean;
  };
  highlight1?: HighlightBehavior;
  highlight2?: HighlightBehavior;
  highlight3?: HighlightBehavior;
  highlight4?: HighlightBehavior;
  highlight5?: HighlightBehavior;
  customPropertyCards?: {
    visible?: boolean;
    filterCategory?: string;
    filterName?: string;
    queryParam?: string;
  };
  newsletterVisible?: boolean;
};

type HighlightBehavior = {
  typeProperty?: "default" | "condominium";
  queryParams?: string;
  pricePriority?: "sale" | "rent" | "lease";
  filter?: {
    key?: string;
    options?: { label?: string; value?: string; withFullBorder?: boolean }[];
  };
};

type SeoBehavior = {
  advancedSearchIndexable?: boolean;
};

type IntegrationsBehavior = {
  blogEndpoint?: string;
  newsletterUrl?: string;
  newsletterMethod?: string;
};

type CondominiumBehavior = {
  withLinkedProperties?: boolean;
};

// ============================================================================
// CATEGORIA C — CONTEÚDO (textos) + ASSETS (URLs de mídia)
// ============================================================================

export type ContentKey =
  | "footer.slogan"
  | "footer.copyright"
  | "footer.devTeam"
  | "footer.realEstateName"
  | "footer.openingHours.title"
  | "footer.openingHours.description"
  | "footer.menu.title.main"
  | "footer.menu.title.links"
  | "footer.menu.title.contact"
  | "footer.menu.title.chat"
  | "footer.contact.phone1.label"
  | "footer.contact.phone2.label"
  | "header.subMenu.title"
  | "header.menu.aboutUs.label"
  | "header.menu.home.label"
  | "header.menu.work.label"
  | "header.menu.advertiseYourProperty.label"
  | "header.menu.facilities.label"
  | "header.menu.customerArea.label"
  | "header.menu.favorites.label"
  | "header.menu.call.label"
  | "header.menu.phone.label"
  | "home.banner.title"
  | "home.banner.secondaryPhrase"
  | "home.banner.fontFamilyTitle"
  | "home.banner.aboutUs.title"
  | "home.banner.aboutUs.subtitle"
  | "home.banner.searchBox.expandFilterTitle"
  | "home.banner.searchCondominium.buttonLabel"
  | "home.banner.searchUnderkating.buttonLabel"
  | "home.financingBanner.title"
  | "home.financingBanner.subtitle"
  | "home.financingBanner.buttonLabel"
  | "home.highlight1.title"
  | "home.highlight1.subtitle"
  | "home.highlight1.viewMoreLabel"
  | "home.highlight2.title"
  | "home.highlight2.subtitle"
  | "home.highlight2.viewMoreLabel"
  | "home.highlight3.title"
  | "home.highlight3.subtitle"
  | "home.highlight3.viewMoreLabel"
  | "home.highlight4.title"
  | "home.highlight4.subtitle"
  | "home.highlight4.viewMoreLabel"
  | "home.highlight5.title"
  | "home.highlight5.subtitle"
  | "home.highlight5.viewMoreLabel"
  | "home.miniBanner.title"
  | "home.miniBanner.titleText"
  | "home.miniBanner.descriptionText"
  | "home.testimonials.title"
  | "home.aboutUs.title"
  | "home.aboutUs.description"
  | "home.aboutUs.text"
  | "home.aboutUs.fontFamilyTitle"
  | "home.aboutUs.fontFamilyText"
  | "home.aboutUs.highlightTitle1"
  | "home.aboutUs.highlightTitle2"
  | "home.aboutUs.block1.title"
  | "home.aboutUs.block1.text"
  | "home.aboutUs.block2.title"
  | "home.aboutUs.block2.text"
  | "home.blog.title"
  | "home.sectionProcess.title"
  | "home.sectionProcess.subtitle"
  | "home.secondaryBlockWords.title"
  | "home.blockWords.title"
  | "home.bannerAds.title"
  | "home.bannerAds.description"
  | "home.bannerAds.buttonLabel"
  | "home.secondaryBanner.title"
  | "home.secondaryBanner.subtitle"
  | "home.secondaryBanner.buttonLabel"
  | "home.customPropertyCards.title"
  | "search.tabs.underkatingLabel"
  | "search.tabs.underkatingLabel.short"
  | "search.tabs.condominiumLabel"
  | "search.tabs.condominiumLabel.short"
  | "search.negotiation.forSaleLabel"
  | "search.negotiationType.label"
  | "buttons.homeSearch.label"
  | "buttons.viewMore.label"
  | "details.interestSection.title"
  | "details.tour360Label"
  | "details.btn1.label"
  | "details.btn2.label"
  | "details.btn3.label"
  | "details.btn4.label"
  | "details.btn5.label"
  | "cards.buttonViewMore.label"
  | "pages.favorites.title"
  | "pages.favorites.subtitle"
  | "pages.favorites.description"
  | "pages.advertise.title"
  | "pages.advertise.subtitle"
  | "pages.advertise.description"
  | "pages.advertise.content.title"
  | "pages.advertise.content.description"
  | "pages.advertise.cardHeader.title"
  | "pages.advertise.cardHeader.subtitle"
  | "pages.advertise.groupCards.title"
  | "pages.advertise.groupCards.subtitle"
  | "pages.order.title"
  | "pages.order.subtitle"
  | "pages.order.description"
  | "pages.work.title"
  | "pages.work.subtitle"
  | "pages.work.description"
  | "pages.work.cardHeader.title"
  | "pages.work.cardHeader.subtitle"
  | "pages.work.groupCards.title"
  | "pages.work.groupCards.subtitle"
  | "pages.call.title"
  | "pages.call.subtitle"
  | "pages.call.description"
  | "pages.contactUs.title"
  | "pages.contactUs.subtitle"
  | "pages.contactUs.description"
  | "pages.about.title"
  | "pages.about.subtitle"
  | "pages.about.description"
  | "pages.financing.title"
  | "pages.financing.subtitle"
  | "pages.financing.description"
  | "pages.privacyPolicy.title"
  | "pages.privacyPolicy.subtitle"
  | "pages.privacyPolicy.description"
  | "pages.calculator.title"
  | "pages.calculator.subtitle"
  | "pages.calculator.description"
  | "pages.propertyDetails.title"
  | "pages.propertyDetails.subtitle"
  | "pages.propertyDetails.description";

export type AssetKey =
  | "brand.logoUrl"
  | "footer.v8LogoUrl"
  | "general.mapThumbnailUrl"
  | "secondaryInstance.logoUrl"
  | "home.banner.imageUrl"
  | "home.mainBannerUrl"
  | "home.aboutUs.imageUrl"
  | "home.promotionalBanner.banner1Url"
  | "home.promotionalBanner.banner2Url"
  | "home.promotionalBanner.banner1MobileUrl"
  | "home.promotionalBanner.banner2MobileUrl"
  | "home.promotionalBanner.link1Url"
  | "home.promotionalBanner.link2Url"
  | "home.promotionalBanner.link1MobileUrl"
  | "home.promotionalBanner.link2MobileUrl"
  | "home.secondaryBanner.iconUrl"
  | "home.secondaryBanner.linkUrl"
  | "home.condominiumManagement.linkUrl"
  | "home.highlight1.titleLinkUrl"
  | "home.highlight2.titleLinkUrl"
  | "home.highlight3.titleLinkUrl"
  | "home.highlight4.titleLinkUrl"
  | "home.highlight5.titleLinkUrl"
  | "pages.favorites.imageUrl"
  | "pages.advertise.imageUrl"
  | "pages.order.imageUrl"
  | "pages.work.imageUrl"
  | "pages.call.imageUrl"
  | "pages.about.imageUrl"
  | "pages.contactUs.imageUrl"
  | "pages.financing.imageUrl"
  | "pages.privacyPolicy.imageUrl"
  | "pages.calculator.imageUrl"
  | "pages.propertyDetails.imageUrl";

// ============================================================================
// AUXILIAR
// ============================================================================

export type ThemeName =
  | "kozmab"
  | "attila"
  | "nh"
  | "romero"
  | "robles"
  | "ventures"
  | "dornelas"
  | "casel"
  | "demax"
  | "hall"
  | "mmriviera";
