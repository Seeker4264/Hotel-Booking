enum room_type {
  "small",
  "medium",
  "large"
};

export interface room {
  "room_id": number;
  "floor": number;
  "room_type": room_type;
};
