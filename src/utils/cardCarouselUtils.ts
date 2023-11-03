export function getCreditCardCarousel() {
    return [
      getCreditCardHeroCard('UnionBank Miles+ Visa Signature', 'https://cdn.yellowmessenger.com/cbtOovLHglQH1675146752598.jpg', 'Earn miles that last forever for a lifetime of adventures.', 'https://www.unionbankph.com/cards/credit-card?id=3903' ),
      getCreditCardHeroCard('UnionBank Miles+ World Mastercard', 'https://cdn.yellowmessenger.com/lk6s3tMgKKQI1675146766229.jpg', 'Earn miles that last forever for a lifetime of adventures.', 'https://www.unionbankph.com/cards/credit-card?id=4004'),
      getCreditCardHeroCard('Cebu Pacific Platinum Credit Card', 'https://cdn.yellowmessenger.com/JePTT9k53oGl1675146775341.jpg', 'Earn Go Rewards points with every spend, plus enjoy exclusive Cebu Pacific benefits and perks.', 'https://www.unionbankph.com/cards/credit-card?id=159'),
    ];
  }
  
  function getCreditCardHeroCard(title: string, imageUrl: string, content: string, pageUrl: string) {
    return {
      contentType: 'application/vnd.microsoft.card.hero',
      content: {
        title,
        images: [{ url: imageUrl }],
        text: content,
        buttons: [
          {
            type: 'openUrl',
            title: 'Learn More',
            value: pageUrl,
          },
        ],
      },
    };
  }
  