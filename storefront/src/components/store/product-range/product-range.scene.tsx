"use client"

import Link from "next/link"
import Image from "next/image"
import { StoreHero } from "~/components/store/store-hero"
import { ArrowRight } from "lucide-react"
import type { StoreRangePageData, CategoryData, WhyChooseUsCardData } from "~/lib/data/store-range-page"

interface ProductRangeSceneProps {
  data: StoreRangePageData
}

export function ProductRangeScene({ data }: ProductRangeSceneProps) {
  const { hero, categories, eosPartnership, whyChooseUs } = data
  
  const featuredCategories = categories.filter((c) => c.featured)
  const regularCategories = categories.filter((c) => !c.featured)

  return (
    <div className="flex flex-col">
      {hero && (
        <StoreHero
          title={hero.title}
          subtitle={hero.subtitle}
          description={hero.description}
          backgroundImage={hero.backgroundImageUrl}
          ctaText={hero.ctaText}
          ctaHref={hero.ctaHref}
          features={hero.features}
        />
      )}

      <div className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-[1512px] px-6">
          {/* Introduction Section */}
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Browse Our Product Range
            </h2>
            <p className="mx-auto max-w-3xl text-base text-gray-600 md:text-lg">
              As an official EOS partner and distributor, we bring you the finest
              sauna and wellness equipment. Each product is carefully selected to
              ensure the highest quality and performance for your wellness journey.
            </p>
          </div>

          {/* Featured Categories */}
          {featuredCategories.length > 0 && (
            <div id="categories" className="mb-12">
              <h3 className="mb-6 text-2xl font-semibold text-gray-900">
                Featured Products
              </h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {featuredCategories.map((category) => (
                  <CategoryCard key={category.id} category={category} featured />
                ))}
              </div>
            </div>
          )}

          {/* Regular Categories */}
          {regularCategories.length > 0 && (
            <div>
              <h3 className="mb-6 text-2xl font-semibold text-gray-900">
                All Products
              </h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {regularCategories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>
          )}

          {/* EOS Partnership Section */}
          {eosPartnership && (
            <div className="mt-16 rounded-2xl bg-white p-8 shadow-sm md:p-12">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <div className="mb-4 inline-block rounded-full bg-[#C5AF71]/10 px-4 py-2 text-sm font-medium text-[#C5AF71]">
                    {eosPartnership.badge}
                  </div>
                  <h3 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
                    {eosPartnership.title}
                  </h3>
                  <p className="mb-6 whitespace-pre-wrap text-gray-600">
                    {eosPartnership.content}
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {eosPartnership.stats.map((stat, index) => (
                      <div key={index}>
                        <div className="text-3xl font-bold text-[#C5AF71]">{stat.value}</div>
                        <div className="text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-gray-100">
                  <Image
                    src={eosPartnership.imageUrl}
                    alt="EOS Sauna Technology"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Why Choose Us Section */}
          {whyChooseUs && whyChooseUs.cards.length > 0 && (
            <div className="mt-16">
              <h3 className="mb-8 text-center text-2xl font-bold text-gray-900 md:text-3xl">
                {whyChooseUs.title}
              </h3>
              <div className="grid gap-6 md:grid-cols-3">
                {whyChooseUs.cards.map((card, index) => (
                  <WhyChooseUsCard key={index} card={card} index={index} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface CategoryCardProps {
  category: CategoryData
  featured?: boolean
}

function CategoryCard({ category, featured = false }: CategoryCardProps) {
  return (
    <Link href={category.href}>
      <div
        className={`group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl ${
          featured ? "h-[400px]" : "h-[350px]"
        }`}
      >
        <div className="relative h-3/5 w-full overflow-hidden bg-gray-100">
          <Image
            src={category.imageUrl}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {category.badge && (
            <div className="absolute right-4 top-4 rounded-full bg-[#C5AF71] px-3 py-1 text-xs font-semibold text-white">
              {category.badge}
            </div>
          )}
        </div>

        <div className="flex h-2/5 flex-col justify-between p-6">
          <div>
            <h3
              className={`mb-2 font-semibold text-gray-900 ${
                featured ? "text-xl md:text-2xl" : "text-lg"
              }`}
            >
              {category.name}
            </h3>
            <p className="line-clamp-2 text-sm text-gray-600">
              {category.description}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-4 text-sm font-medium text-[#C5AF71] transition-all group-hover:gap-3">
            <span>Explore Products</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  )
}

interface WhyChooseUsCardProps {
  card: WhyChooseUsCardData
  index: number
}

function WhyChooseUsCard({ card, index }: WhyChooseUsCardProps) {
  // Hardcoded icons for the 3 cards
  const icons = [
    // Checkmark icon (Expert Consultation)
    <svg key="check" className="h-6 w-6 text-[#C5AF71]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>,
    // Gear icon (Professional Installation)
    <svg key="gear" className="h-6 w-6 text-[#C5AF71]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>,
    // Support icon (Ongoing Support)
    <svg key="support" className="h-6 w-6 text-[#C5AF71]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>,
  ]

  const icon = icons[index] || icons[0]

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#C5AF71]/10">
        {icon}
      </div>
      <h4 className="mb-2 text-lg font-semibold text-gray-900">
        {card.title}
      </h4>
      <p className="text-sm text-gray-600">
        {card.description}
      </p>
    </div>
  )
}

