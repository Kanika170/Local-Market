// Mock review data with realistic distribution
const generateMockReviews = () => {
  const reviews = [];
  let id = 1;

  // Helper function to generate random date within last 6 months
  const getRandomDate = () => {
    const now = new Date();
    const sixMonthsAgo = new Date(now.setMonth(now.getMonth() - 6));
    const randomDate = new Date(sixMonthsAgo.getTime() + Math.random() * (new Date().getTime() - sixMonthsAgo.getTime()));
    
    // Format date as relative time
    const diffDays = Math.floor((new Date() - randomDate) / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const names5Star = ['Sarah Johnson', 'Michael Chen', 'Emily Davis', 'David Kim', 'Rachel Smith', 'James Wilson', 'Maria Garcia', 'John Taylor', 'Lisa Anderson', 'Kevin Lee'];
  const comments5Star = [
    'Absolutely fantastic shopping experience! The produce is always fresh and the staff is incredibly helpful.',
    'Best grocery store in the area. Love their organic selection and reasonable prices.',
    'Amazing customer service and great quality products. Will definitely be coming back!',
    'The store is always clean and well-organized. Shopping here is a pleasure.',
    'Excellent selection of fresh produce and friendly staff. Highly recommend!'
  ];

  // 5-star reviews (156)
  for (let i = 0; i < 156; i++) {
    reviews.push({
      id: id++,
      name: names5Star[Math.floor(Math.random() * names5Star.length)],
      rating: '★★★★★',
      date: getRandomDate(),
      comment: comments5Star[Math.floor(Math.random() * comments5Star.length)],
      images: Math.random() > 0.8 ? ['image1.jpg', 'image2.jpg'] : undefined,
      shopResponse: Math.random() > 0.7 ? 'Thank you for your wonderful review! We are glad you had a great experience shopping with us.' : undefined
    });
  }

  const names4Star = ['Tom Brown', 'Anna Martinez', 'Chris Walker', 'Jenny Park', 'Robert Miller', 'Sofia Rodriguez', 'Daniel White', 'Emma Thompson', 'Alex Turner', 'Michelle Lee'];
  const comments4Star = [
    'Very good store overall. Could improve their checkout speed during peak hours.',
    'Great selection but slightly higher prices than other stores.',
    'Fresh produce and friendly staff. Would give 5 stars if prices were better.',
    'Good shopping experience. Some items were out of stock though.',
    'Nice store with good variety. Parking can be challenging during busy hours.'
  ];

  // 4-star reviews (67)
  for (let i = 0; i < 67; i++) {
    reviews.push({
      id: id++,
      name: names4Star[Math.floor(Math.random() * names4Star.length)],
      rating: '★★★★☆',
      date: getRandomDate(),
      comment: comments4Star[Math.floor(Math.random() * comments4Star.length)],
      images: Math.random() > 0.9 ? ['image1.jpg'] : undefined,
      shopResponse: Math.random() > 0.8 ? 'Thank you for your feedback! We are constantly working on improving our service.' : undefined
    });
  }

  const names3Star = ['Peter Collins', 'Susan Wright', 'George Baker', 'Helen Kim', 'Frank Morris', 'Tracy Evans', 'Paul Green', 'Linda Carter', 'Steve Rogers', 'Nancy Lee'];
  const comments3Star = [
    'Average store. Nothing special but gets the job done.',
    'Decent selection but prices are a bit high.',
    'Some products were not fresh. Service was okay.',
    'Store layout is confusing. Staff could be more helpful.',
    'Mixed experience. Some good products but inconsistent quality.'
  ];

  // 3-star reviews (20)
  for (let i = 0; i < 20; i++) {
    reviews.push({
      id: id++,
      name: names3Star[Math.floor(Math.random() * names3Star.length)],
      rating: '★★★☆☆',
      date: getRandomDate(),
      comment: comments3Star[Math.floor(Math.random() * comments3Star.length)]
    });
  }

  const names2Star = ['Mike Peterson', 'Carol Adams', 'Joe Wilson', 'Karen Clark', 'Tim Roberts', 'Alice Cooper', 'Bob Marshall', 'Diana Ross'];
  const comments2Star = [
    'Disappointed with the quality. Many items were close to expiration.',
    'Poor customer service and overpriced products.',
    'Store was messy and disorganized. Will not return.',
    'Limited selection and high prices. Not recommended.',
    'Had better experiences at other stores. Needs improvement.'
  ];

  // 2-star reviews (8)
  for (let i = 0; i < 8; i++) {
    reviews.push({
      id: id++,
      name: names2Star[Math.floor(Math.random() * names2Star.length)],
      rating: '★★☆☆☆',
      date: getRandomDate(),
      comment: comments2Star[Math.floor(Math.random() * comments2Star.length)],
      shopResponse: Math.random() > 0.5 ? 'We apologize for your experience. Please contact our customer service so we can address your concerns.' : undefined
    });
  }

  const names1Star = ['Ryan Phillips', 'Mary Johnson', 'Thomas Brown', 'Sandra White', 'Eric Davis'];
  const comments1Star = [
    'Terrible experience! Will never shop here again.',
    'Extremely poor service and quality. Avoid this store.',
    'Worst shopping experience ever. Complete waste of time.',
    'Found expired products and rude staff.',
    'Absolutely disappointed. Do not recommend.'
  ];

  // 1-star reviews (5)
  for (let i = 0; i < 5; i++) {
    reviews.push({
      id: id++,
      name: names1Star[i],
      rating: '★☆☆☆☆',
      date: getRandomDate(),
      comment: comments1Star[i],
      shopResponse: 'We sincerely apologize for your negative experience. Please contact our manager at manager@store.com to discuss your concerns.'
    });
  }

  // Shuffle the reviews to randomize their order
  return reviews.sort(() => Math.random() - 0.5);
};

export const mockReviews = generateMockReviews();
