// ── Enums ──

export type MilkType = 'oat' | 'almond' | 'coconut' | 'whole' | 'skim' | 'soy' | 'none';
export type PowderBrand = 'ippodo' | 'marukyu' | 'ceremonial' | 'enacha' | 'cuzen' | 'other';
export type TasteRating = '1' | '2' | '3' | '4' | '5';
export type ShopCategory = 'powders' | 'whisks' | 'straws' | 'cups' | 'accessories';
export type BuddyIntent = 'cafe_date' | 'study_buddy' | 'cafe_hopping' | 'just_chatting';
export type BadgeType = 'first_post' | 'explorer' | 'matcha_master' | 'social_butterfly' | 'top_reviewer' | 'cafe_hopper' | 'matcha_buddy';
export type ReviewType = 'cafe' | 'powder';
export type SwipeAction = 'like' | 'pass';
export type FriendshipStatus = 'pending' | 'accepted' | 'declined';

// ── Pagination ──

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  limit: number;
  offset: number;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

// ── User ──

export interface UserPublic {
  id: string;
  name: string;
  username: string;
  avatar_url: string | null;
  bio: string;
  created_at: string;
}

export interface UserSummary {
  id: string;
  name: string;
  username: string;
  avatar_url: string | null;
}

export interface UserStats {
  post_count: number;
  matcha_count: number;
  badge_count: number;
  avg_rating: number;
}

export interface UserMe extends UserPublic {
  email: string;
  stats: UserStats;
}

export interface UpdateUserPayload {
  name?: string;
  username?: string;
  email?: string;
  bio?: string;
  avatar_url?: string;
}

// ── Auth ──

export interface RegisterProfilePayload {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  agree_newsletter?: boolean;
  agree_privacy?: boolean;
}

// ── Matcha ──

export interface Matcha {
  id: string;
  user: UserSummary;
  place: { id: string; name: string } | null;
  image_url: string | null;
  milk_type: MilkType;
  powder_brand: PowderBrand | null;
  cafe_name: string;
  price: number;
  taste_rating: number;
  created_at: string;
}

export interface CreateMatchaPayload {
  image_url?: string;
  milk_type: MilkType;
  powder_brand?: PowderBrand;
  cafe_name: string;
  place_id?: string;
  price: number;
  taste_rating: TasteRating;
}

export interface MatchaFilters extends PaginationParams {
  sort?: 'recent' | 'top_rated';
  milk_type?: MilkType;
  powder_brand?: PowderBrand;
}

// ── Post ──

export interface Post {
  id: string;
  user: UserSummary;
  matcha: Matcha | null;
  image_url: string | null;
  caption: string;
  review_type: ReviewType;
  like_count: number;
  comment_count: number;
  is_liked: boolean;
  is_saved: boolean;
  is_promoted_event: boolean;
  event_title: string | null;
  event_date: string | null;
  created_at: string;
}

export interface CreatePostPayload {
  matcha_id?: string;
  image_url?: string;
  caption: string;
  review_type?: ReviewType;
  is_promoted_event?: boolean;
  event_title?: string;
  event_date?: string;
}

export interface PostFilters extends PaginationParams {
  filter?: 'all' | 'cafes' | 'powders';
  events_only?: boolean;
}

// ── Comment ──

export interface Comment {
  id: string;
  post_id: string;
  user: UserSummary;
  parent_id: string | null;
  text: string;
  reply_count: number;
  created_at: string;
}

export interface CreateCommentPayload {
  text: string;
  parent_id?: string;
}

// ── Place ──

export interface Place {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  image_url: string | null;
  rating: number | null;
  matcha_count: number;
  is_saved: boolean;
}

export interface PlaceDetail extends Place {
  google_place_id: string | null;
  google_rating: number | null;
  google_price_level: number | null;
  phone: string | null;
  website: string | null;
  opening_hours: OpeningHours | null;
  place_types: string[];
  source: 'user' | 'google';
}

export interface OpeningHours {
  periods: unknown[];
  weekday_text: string[];
  open_now: boolean;
}

export interface CreatePlacePayload {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  image_url?: string;
}

export interface PlaceSearchParams extends PaginationParams {
  search?: string;
  lat?: number;
  lng?: number;
  radius_km?: number;
}

export interface NearbyParams {
  lat: number;
  lng: number;
  radius_km?: number;
  limit?: number;
}

export interface GoogleSearchParams {
  lat: number;
  lng: number;
  radius_m?: number;
  keyword?: string;
  limit?: number;
  next_page_token?: string;
}

export interface GoogleSearchResponse {
  data: PlaceDetail[];
  next_page_token: string | null;
  count: number;
}

// ── Buddy ──

export interface BuddyProfile {
  id: string;
  user: UserSummary;
  bio: string;
  favorite_matcha: string;
  milk_preference: MilkType | null;
  intent: BuddyIntent | null;
  go_to_cafe: string;
  interests: string[];
  education: string;
  work: string;
  pronouns: string;
  gender: string;
  instagram: string;
  tiktok: string;
  extra_photo_urls: string[];
  distance_km?: number;
}

export interface UpdateBuddyProfilePayload {
  bio?: string;
  favorite_matcha?: string;
  milk_preference?: MilkType;
  intent?: BuddyIntent;
  go_to_cafe?: string;
  interests?: string[];
  education?: string;
  work?: string;
  pronouns?: string;
  gender?: string;
  instagram?: string;
  tiktok?: string;
  extra_photo_urls?: string[];
  is_active?: boolean;
}

export interface SwipePayload {
  user_id: string;
  action: SwipeAction;
}

export interface SwipeResult {
  matched: boolean;
}

export interface BuddyDiscoverParams {
  limit?: number;
  lat?: number;
  lng?: number;
}

// ── Friends ──

export interface Friend {
  id: string;
  user: UserSummary;
  favorite_matcha: string;
  friend_since: string;
  is_online: boolean;
  last_active_at: string;
}

export interface FriendRequestPayload {
  user_id: string;
}

export interface UpdateFriendshipPayload {
  status: 'accepted' | 'declined';
}

// ── Messages ──

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  text: string;
  read_at: string | null;
  created_at: string;
}

export interface Conversation {
  partner: UserSummary;
  last_message: {
    text: string;
    created_at: string;
    is_mine: boolean;
  };
  unread_count: number;
}

export interface SendMessagePayload {
  text: string;
}

export interface MessageParams {
  limit?: number;
  before?: string;
}

// ── Shop ──

export interface ShopItem {
  id: string;
  name: string;
  category: ShopCategory;
  price: number;
  image_url: string | null;
  description: string;
  partner_url: string | null;
  rating: number;
  review_count: number;
  rating_distribution: Record<string, number>;
  is_wishlisted: boolean;
}

export interface ShopItemFilters extends PaginationParams {
  category?: ShopCategory;
  sort?: 'rating' | 'price_asc' | 'price_desc';
}

export interface ShopReview {
  id: string;
  shop_item_id: string;
  user: UserSummary;
  rating: number;
  title: string;
  text: string;
  created_at: string;
}

export interface CreateShopReviewPayload {
  rating: number;
  title: string;
  text: string;
}

// ── Badges ──

export interface Badge {
  id: string;
  type: BadgeType;
  name: string;
  description: string;
  icon_name: string;
  color: string;
}

export interface UserBadge extends Badge {
  earned_at: string;
}

// ── API Error ──

export interface ApiError {
  detail: string;
  status: number;
}
