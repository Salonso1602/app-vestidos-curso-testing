export const testLenderData = [
  {
    fullName: "Sophie Turner",
    email: "sophie.turner@example.com",
    phone: "+1 415 555 1293",
    items: "Evening gowns, pearl necklace set, designer high heels."
  },
  {
    fullName: "Marina López",
    email: "marina.lopez@example.com",
    phone: "+598 93 221 874",
    items: "Boho dresses, leather jackets, vintage handbags."
  },
  {
    fullName: "Lionel Messi",
    email: "daniel.rod@example.com",
    phone: "+34 612 448 938",
    items: "Formal suits, tuxedos, bowties and belts."
  },
  {
    fullName: "Emily Carter",
    email: "emily.carter@example.com",
    phone: "+44 7458 223411",
    items: "Casual streetwear, branded sneakers, oversized hoodies."
  },
  {
    fullName: "Lucía Fernández",
    email: "lucia.fernandez@example.com",
    phone: "+598 98 345 112",
    items: "Quinceañera dress, tiaras, glitter accessories."
  }
];

export const incompleteLenderCases = [
  {
    missing: "fullName",
    data: { fullName: "", email: "test@example.com", phone: "+598 99 123 456", items: "Some message" }
  },
  {
    missing: "email",
    data: { fullName: "Test User", email: "", phone: "+598 99 123 456", items: "Some message" }
  },
  {
    missing: "phone",
    data: { fullName: "Test User", email: "test@example.com", phone: "", items: "Some message" }
  },
  {
    missing: "items",
    data: { fullName: "Test User", email: "test@example.com", phone: "+598 99 123 456", items: "" }
  }
];
