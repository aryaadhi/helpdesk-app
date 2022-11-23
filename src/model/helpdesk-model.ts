interface RequestInfo {
    id: number;
    user_id: number;
    request: string;
    submitted_date: string;
    priority: string;
    feature: string;
    has_ticket: string;
}

interface TicketInfo {
    ticket_id: number;
    request_id: number;
    feedback_id: number;
    user_id: number;
    ticket_number: string;
    category: string;
    impact: string;
    urgency: string;
    created: string;
    ticket_age: number;
    closing_status: string;
    closing_date: string;
    request: string;
    remark: string;
    priority: string;
    user_rating: number;
    feedback: string;
}

interface RequestCategory {
    lookup_code: string;
    lookup_value: string;
    lookup_desc: string;
}

export interface RequestModel {
    requests: RequestInfo[];
}

export interface TicketModel {
    tickets: TicketInfo[];
}

export interface RequestCategoryModel {
    requestCategories: RequestCategory[];
}