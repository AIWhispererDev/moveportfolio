import React, { useState } from 'react';
import { 
  FaCheck, 
  FaTimes, 
  FaCrown, 
  FaRocket,
  FaUser,
  FaBuilding,
  FaInfinity,
  FaChartLine,
  FaDownload,
  FaShieldAlt,
  FaHeadset
} from 'react-icons/fa';

import { cn } from '../lib/utils';
import { Card, CardHeader, CardContent } from './ui/card';
import { Button } from './ui/button';

export interface PlanFeature {
  name: string;
  included: boolean;
  limit?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
  description: string;
  icon: React.ReactNode;
  popular?: boolean;
  features: PlanFeature[];
  buttonText: string;
  buttonVariant: 'ghost' | 'primary' | 'secondary';
}

export interface SubscriptionPlansProps {
  currentPlan?: string;
  onPlanSelect?: (planId: string) => void;
  className?: string;
}

/**
 * SubscriptionPlans Component
 * Displays subscription tiers with feature comparison
 * Implements clean monetization UX for blockchain explorer
 */
const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({
  currentPlan = 'free',
  onPlanSelect,
  className
}) => {
  const [billingPeriod, setBillingPeriod] = useState<'month' | 'year'>('month');

  const plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Explorer',
      price: 0,
      period: 'month',
      description: 'Perfect for casual users and basic exploration',
      icon: <FaUser />,
      features: [
        { name: 'Basic transaction search', included: true },
        { name: 'Latest blocks & transactions', included: true },
        { name: 'Network statistics', included: true },
        { name: 'Address lookup', included: true },
        { name: 'API requests', included: true, limit: '1,000/day' },
        { name: 'Data export', included: true, limit: '100 records' },
        { name: 'Historical data', included: true, limit: '30 days' },
        { name: 'Advanced analytics', included: false },
        { name: 'Custom alerts', included: false },
        { name: 'Priority support', included: false }
      ],
      buttonText: 'Current Plan',
      buttonVariant: 'ghost'
    },
    {
      id: 'pro',
      name: 'Professional',
      price: billingPeriod === 'month' ? 29 : 290,
      period: billingPeriod,
      description: 'For developers and power users who need more',
      icon: <FaRocket />,
      popular: true,
      features: [
        { name: 'Everything in Explorer', included: true },
        { name: 'Advanced search filters', included: true },
        { name: 'API requests', included: true, limit: '100,000/day' },
        { name: 'Data export', included: true, limit: '10,000 records' },
        { name: 'Historical data', included: true, limit: '1 year' },
        { name: 'Advanced analytics', included: true },
        { name: 'Custom alerts', included: true, limit: '50 alerts' },
        { name: 'Webhook notifications', included: true },
        { name: 'CSV/JSON/Excel export', included: true },
        { name: 'Priority support', included: false }
      ],
      buttonText: 'Upgrade to Pro',
      buttonVariant: 'primary'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingPeriod === 'month' ? 199 : 1990,
      period: billingPeriod,
      description: 'For organizations with advanced needs',
      icon: <FaBuilding />,
      features: [
        { name: 'Everything in Professional', included: true },
        { name: 'API requests', included: true, limit: 'Unlimited' },
        { name: 'Data export', included: true, limit: 'Unlimited' },
        { name: 'Historical data', included: true, limit: 'Complete history' },
        { name: 'Custom dashboards', included: true },
        { name: 'White-label options', included: true },
        { name: 'Custom alerts', included: true, limit: 'Unlimited' },
        { name: 'Dedicated support', included: true },
        { name: 'SLA guarantee', included: true },
        { name: 'Custom integrations', included: true }
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'secondary'
    }
  ];

  const handlePlanSelect = (planId: string) => {
    onPlanSelect?.(planId);
  };

  const formatPrice = (price: number, period: string) => {
    if (price === 0) return 'Free';
    return `$${price}/${period}`;
  };

  const getDiscountText = () => {
    if (billingPeriod === 'year') {
      return 'Save 17% with annual billing';
    }
    return null;
  };

  return (
    <div className={cn('subscription-plans', className)}>
      <div className="space-y-6">
        {/* Header */}
        <div className="subscription-plans__header">
          <h2 className="subscription-plans__title">
            Choose Your Plan
          </h2>
          <p className="subscription-plans__subtitle">
            Unlock advanced features and scale your blockchain analysis
          </p>
          
          {/* Billing Toggle */}
          <div className="subscription-plans__billing-toggle">
            <Button
              variant={billingPeriod === 'month' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setBillingPeriod('month')}
            >
              Monthly
            </Button>
            <Button
              variant={billingPeriod === 'year' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setBillingPeriod('year')}
            >
              Annual
            </Button>
          </div>
          
          {getDiscountText() && (
            <div className="subscription-plans__discount">
              {getDiscountText()}
            </div>
          )}
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.id}>
              <Card className={cn('subscription-plans__plan', {
                'subscription-plans__plan--popular': plan.popular,
                'subscription-plans__plan--current': currentPlan === plan.id
              })}>
                {plan.popular && (
                  <div className="subscription-plans__popular-badge">
                    <FaCrown /> Most Popular
                  </div>
                )}
                
                <CardHeader className="subscription-plans__plan-header">
                  <div className="subscription-plans__plan-icon">
                    {plan.icon}
                  </div>
                  <h3 className="subscription-plans__plan-name">
                    {plan.name}
                  </h3>
                  <div className="subscription-plans__plan-price">
                    {formatPrice(
                      billingPeriod === 'year' && plan.price > 0 
                        ? Math.floor(plan.price * 10 / 12) 
                        : plan.price, 
                      billingPeriod
                    )}
                  </div>
                  <p className="subscription-plans__plan-description">
                    {plan.description}
                  </p>
                </CardHeader>
                
                <CardContent className="subscription-plans__plan-body">
                  <div className="subscription-plans__features">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="subscription-plans__feature">
                        <div className="subscription-plans__feature-icon">
                          {feature.included ? (
                            <FaCheck className="subscription-plans__feature-icon--included" />
                          ) : (
                            <FaTimes className="subscription-plans__feature-icon--excluded" />
                          )}
                        </div>
                        <div className="subscription-plans__feature-text">
                          <span className={cn('subscription-plans__feature-name', {
                            'subscription-plans__feature-name--excluded': !feature.included
                          })}>
                            {feature.name}
                          </span>
                          {feature.limit && (
                            <span className="subscription-plans__feature-limit">
                              {feature.limit}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Button
                    variant={plan.buttonVariant}
                    size="lg"
                    onClick={() => handlePlanSelect(plan.id)}
                    disabled={currentPlan === plan.id}
                    className="subscription-plans__plan-button"
                  >
                    {currentPlan === plan.id ? 'Current Plan' : plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Feature Highlights */}
        <Card>
          <CardHeader
            title="Why Upgrade?"
            subtitle="Unlock powerful features for serious blockchain analysis"
          />
          <CardContent>
            <div className="grid gap-4">
              <div>
                <div className="subscription-plans__highlight">
                  <FaChartLine className="subscription-plans__highlight-icon" />
                  <h4>Advanced Analytics</h4>
                  <p>Deep insights into transaction patterns, network trends, and portfolio performance</p>
                </div>
              </div>
              
              <div>
                <div className="subscription-plans__highlight">
                  <FaDownload className="subscription-plans__highlight-icon" />
                  <h4>Bulk Data Export</h4>
                  <p>Export large datasets in multiple formats for offline analysis and reporting</p>
                </div>
              </div>
              
              <div>
                <div className="subscription-plans__highlight">
                  <FaShieldAlt className="subscription-plans__highlight-icon" />
                  <h4>Real-time Alerts</h4>
                  <p>Custom notifications for address activity, large transactions, and market events</p>
                </div>
              </div>
              
              <div>
                <div className="subscription-plans__highlight">
                  <FaHeadset className="subscription-plans__highlight-icon" />
                  <h4>Priority Support</h4>
                  <p>Direct access to our team for technical support and feature requests</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader
            title="Frequently Asked Questions"
          />
          <CardContent>
            <div className="subscription-plans__faq">
              <div className="subscription-plans__faq-item">
                <h4>Can I change plans anytime?</h4>
                <p>Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.</p>
              </div>
              
              <div className="subscription-plans__faq-item">
                <h4>What payment methods do you accept?</h4>
                <p>We accept all major credit cards, PayPal, and cryptocurrency payments.</p>
              </div>
              
              <div className="subscription-plans__faq-item">
                <h4>Is there a free trial for paid plans?</h4>
                <p>Yes, all paid plans come with a 14-day free trial. No credit card required.</p>
              </div>
              
              <div className="subscription-plans__faq-item">
                <h4>Do you offer refunds?</h4>
                <p>We offer a 30-day money-back guarantee for all paid subscriptions.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
export type { PlanFeature, SubscriptionPlan, SubscriptionPlansProps };
