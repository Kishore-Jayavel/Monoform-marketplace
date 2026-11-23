import React, { useState, useMemo } from 'react';
import { PRODUCTS, DELIVERY_OPTIONS } from './data/products';
import { useCart } from './hooks/useCart';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CatalogControls, SortOption } from './components/CatalogControls';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { WishlistModal } from './components/WishlistModal';
import { AccountModal } from './components/AccountModal';
import { CartItem } from './components/CartItem';
import { EmptyCartState } from './components/EmptyCartState';
import { OrderSummary } from './components/OrderSummary';
import { CheckoutStepper } from './components/CheckoutStepper';
import { CheckoutForm } from './components/CheckoutForm';
import { OrderConfirmation } from './components/OrderConfirmation';
import { SignInModal } from './components/SignInModal';
import { NavigationDrawer } from './components/NavigationDrawer';
import { PromoDealsGrid } from './components/PromoDealsGrid';
import {
  Product,
  ProductCategory,
  OrderDetails,
  CheckoutStep,
  DeliveryOption,
  DeliveryAddress,
  PaymentMethod,
  UserProfile
} from './types';
import { generateOrderReference } from './utils/reference';

export const App: React.FC = () => {
  // Cart State Hook
  const {
    items,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalPaise: subtotalPaise,
    totalItemCount,
    isEmpty
  } = useCart([]);

  // Wishlist State
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(1500);

  // Modals & Navigation Drawers
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false);
  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  // Authentication State (Patron Profile)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

  const handleSignIn = (user: UserProfile) => {
    setCurrentUser(user);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  // Checkout Step & Options
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('delivery');
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>(DELIVERY_OPTIONS[0]);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderDetails | null>(null);
  const [recentOrdersCount, setRecentOrdersCount] = useState<number>(0);

  // Wishlist toggle handler
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isProductWishlisted = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Add multiple quantity from detail modal
  const handleAddToCartWithQty = (product: Product, quantity: number) => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('featured');
    setMaxPrice(1500);
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category Filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Price Filter
      const priceRupees = product.pricePaise / 100;
      if (priceRupees > maxPrice) {
        return false;
      }
      // Search Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesSubtitle = product.subtitle.toLowerCase().includes(query);
        return matchesName || matchesDesc || matchesCat || matchesSubtitle;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.pricePaise - b.pricePaise;
      if (sortBy === 'price-desc') return b.pricePaise - a.pricePaise;
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      return 0; // featured / original order
    });
  }, [selectedCategory, searchQuery, sortBy, maxPrice]);

  // Order Placement
  const handlePlaceOrder = (details: {
    customerName: string;
    deliveryAddress: DeliveryAddress;
    deliveryOption: DeliveryOption;
    paymentMethod: PaymentMethod;
  }) => {
    const finalTotalPaise = subtotalPaise + details.deliveryOption.pricePaise;

    const newOrder: OrderDetails = {
      orderReference: generateOrderReference(),
      customerName: details.customerName,
      items: [...items],
      subtotalPaise,
      deliveryChargePaise: details.deliveryOption.pricePaise,
      totalPaise: finalTotalPaise,
      timestamp: new Date().toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }),
      deliveryAddress: details.deliveryAddress,
      deliveryOption: details.deliveryOption,
      paymentMethod: details.paymentMethod
    };

    setConfirmedOrder(newOrder);
    setRecentOrdersCount((prev) => prev + 1);
  };

  const handleResetOrder = () => {
    setConfirmedOrder(null);
    clearCart();
    setCurrentStep('delivery');
    setDeliveryOption(DELIVERY_OPTIONS[0]);
  };

  // Completed steps tracker for stepper progress indicator
  const completedSteps: CheckoutStep[] = useMemo(() => {
    const steps: CheckoutStep[] = [];
    if (!isEmpty) steps.push('cart');
    if (currentStep === 'options' || currentStep === 'payment' || currentStep === 'review') {
      steps.push('delivery');
    }
    if (currentStep === 'payment' || currentStep === 'review') {
      steps.push('options');
    }
    if (currentStep === 'review') {
      steps.push('payment');
    }
    return steps;
  }, [isEmpty, currentStep]);

  // Helper to find quantity in cart
  const getProductCartQuantity = (productId: string) => {
    const found = items.find((item) => item.product.id === productId);
    return found ? found.quantity : 0;
  };

  const handleScrollToCatalogue = () => {
    const el = document.getElementById('catalog-heading');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Marketplace Responsive Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        cartCount={totalItemCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => {
          const cartEl = document.getElementById('bag-heading');
          if (cartEl) cartEl.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onLogoClick={() => {
          handleClearFilters();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        user={currentUser}
        onOpenSignIn={() => setIsSignInOpen(true)}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      {/* Hero Announcement Section */}
      <Hero onExplore={handleScrollToCatalogue} />

      {/* Amazon-Style Promotional Deals Grid (Image 1) */}
      <PromoDealsGrid
        onSelectProduct={setActiveModalProduct}
        onAddToCart={addToCart}
        products={PRODUCTS}
      />

      <main className="main-content" id="main-content" role="main">
        {confirmedOrder ? (
          <OrderConfirmation order={confirmedOrder} onResetOrder={handleResetOrder} />
        ) : (
          <div className="checkout-layout">
            {/* Left Column: Catalogue & Shopping Bag */}
            <div className="layout-left-column">
              {/* Product Catalogue Section */}
              <section className="catalog-section" aria-labelledby="catalog-heading">
                <div className="section-header">
                  <div className="section-title-group">
                    <span className="section-eyebrow">Studio Marketplace</span>
                    <h2 id="catalog-heading" className="section-title">
                      Curated Editions
                    </h2>
                  </div>
                  <span className="section-caption">Editorial Objects &bull; Fixed Pricing</span>
                </div>

                {/* Catalogue Filter & Sorting Controls */}
                <CatalogControls
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  searchQuery={searchQuery}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  maxPrice={maxPrice}
                  onMaxPriceChange={setMaxPrice}
                  totalFilteredCount={filteredProducts.length}
                  totalCatalogueCount={PRODUCTS.length}
                  onClearFilters={handleClearFilters}
                />

                {/* Product Grid or Empty Filter State */}
                {filteredProducts.length === 0 ? (
                  <div className="no-results-card" data-testid="no-results-state">
                    <span className="no-results-icon" aria-hidden="true">&#9775;</span>
                    <h3 className="no-results-title">No Archival Pieces Found</h3>
                    <p className="no-results-text">
                      No studio archetypes match your current search and filter selections.
                    </p>
                    <button
                      type="button"
                      className="btn-clear-filters-primary"
                      onClick={handleClearFilters}
                      data-testid="reset-filters-btn"
                    >
                      Reset All Filters &amp; Search
                    </button>
                  </div>
                ) : (
                  <div className="products-grid" data-testid="products-grid">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                        onViewDetails={setActiveModalProduct}
                        onToggleWishlist={handleToggleWishlist}
                        isWishlisted={isProductWishlisted(product.id)}
                        cartQuantity={getProductCartQuantity(product.id)}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* Shopping Bag Section (Amazon-inspired) */}
              <section className="bag-section" aria-labelledby="bag-heading" id="bag-section">
                <div className="section-header">
                  <div className="section-title-group">
                    <span className="section-eyebrow">Review Selection</span>
                    <h2 id="bag-heading" className="section-title">
                      Shopping Bag
                    </h2>
                  </div>
                  <span className="bag-counter numeric" data-testid="bag-count-badge">
                    {totalItemCount} {totalItemCount === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {isEmpty ? (
                  <EmptyCartState />
                ) : (
                  <>
                    <ul className="cart-items-list" data-testid="cart-items-list">
                      {items.map((item) => (
                        <CartItem
                          key={item.product.id}
                          item={item}
                          onIncrease={increaseQuantity}
                          onDecrease={decreaseQuantity}
                          onRemove={removeFromCart}
                        />
                      ))}
                    </ul>
                    <div className="bag-checkout-cta-wrap">
                      <button
                        type="button"
                        className="btn-proceed-to-checkout"
                        onClick={() => {
                          const el = document.getElementById('checkout-heading');
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }}
                        data-testid="proceed-to-checkout-btn"
                      >
                        Proceed to Checkout Coordinates &darr;
                      </button>
                    </div>
                  </>
                )}
              </section>
            </div>

            {/* Stacked Section: Flipkart-Style Step-by-Step Checkout & Order Summary */}
            <section
              className="layout-checkout-section"
              aria-label="Checkout and Payment Summary"
              id="checkout-section"
            >
              <div className="section-header">
                <div className="section-title-group">
                  <span className="section-eyebrow">Checkout &amp; Coordinates</span>
                  <h2 id="checkout-heading" className="section-title">
                    Order Summary &amp; Dispatch
                  </h2>
                </div>
                <span className="section-caption">Editorial Checkout &bull; Multi-Step Process</span>
              </div>

              <div className="checkout-stacked-container">
                <OrderSummary
                  items={items}
                  subtotalPaise={subtotalPaise}
                  deliveryOption={deliveryOption}
                />

                {/* Checkout Stepper Progress Indicator */}
                <div className="checkout-stepper-wrapper">
                  <CheckoutStepper
                    currentStep={currentStep}
                    onStepClick={(step) => {
                      if (step === 'cart' || !isEmpty) {
                        setCurrentStep(step);
                      }
                    }}
                    completedSteps={completedSteps}
                  />
                </div>

                {/* Multi-Stage Checkout Form Panel */}
                <div className="checkout-form-card">
                  <CheckoutForm
                    isCartEmpty={isEmpty}
                    items={items}
                    subtotalPaise={subtotalPaise}
                    deliveryOption={deliveryOption}
                    onSelectDeliveryOption={setDeliveryOption}
                    onPlaceOrder={handlePlaceOrder}
                    isOrderPlaced={Boolean(confirmedOrder)}
                    currentStep={currentStep}
                    onStepChange={setCurrentStep}
                    user={currentUser}
                    onOpenSignIn={() => setIsSignInOpen(true)}
                  />
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Amazon-Style Navigation Drawer (Image 3) */}
      <NavigationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        user={currentUser}
        onOpenSignIn={() => setIsSignInOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onSelectCategory={setSelectedCategory}
        onSignOut={handleSignOut}
      />

      {/* Patron Sign In Modal */}
      <SignInModal
        isOpen={isSignInOpen}
        onClose={() => setIsSignInOpen(false)}
        onSignIn={handleSignIn}
      />

      {/* Product Details Modal Experience */}
      <ProductDetailsModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
        onAddToCart={handleAddToCartWithQty}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={activeModalProduct ? isProductWishlisted(activeModalProduct.id) : false}
      />

      {/* Wishlist Drawer / Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => setWishlist((prev) => prev.filter((p) => p.id !== id))}
        onMoveToCart={addToCart}
      />

      {/* Account Profile Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        recentOrdersCount={recentOrdersCount}
      />
    </div>
  );
};

export default App;
