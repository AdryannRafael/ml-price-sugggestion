export interface SuggestionOutput {
    item_id: string
    status: string
    currency_id: string
    ratio: number
    current_price: CurrentPriceOutput
    suggested_price: SuggestedPriceOutput
    lowest_price: LowestPriceOutput
    costs: CostsOutput
    applicable_suggestion: boolean
    percent_difference: number
    metadata: MetadataOutput
    promotion_detail: PromotionDetailOutput
    last_updated: string
}

export interface CurrentPriceOutput {
    amount: number
    usd_amount: number
}

export interface SuggestedPriceOutput {
    amount: number
    usd_amount: number
}

export interface LowestPriceOutput {
    amount: number
    usd_amount: number
}

export interface CostsOutput {
    selling_fees: number
    shipping_fees: number
}

export interface MetadataOutput {
    graph: GraphOutput[]
    compared_values: number
}

export interface GraphOutput {
    price: PriceOutput
    info: InfoOutput
}

export interface PriceOutput {
    amount: number
    usd_amount: number
}

export interface InfoOutput {
    title: string
    sold_quantity: number
}

export interface PromotionDetailOutput {
    unhealthy_reason: string
    days_unhealthy: number
    campaign_start_date: string
    campaign_end_date: string
    promotion_id: string
    discount_percent: number
    campaign_name: string
}
