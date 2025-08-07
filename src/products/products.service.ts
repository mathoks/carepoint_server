import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  product as ProductModel,
  Prisma,
  prod_reviews as ReviewsModel,
  category as CategoryModel,
  ratings_stats,
  reaction,
  prod_reviews,
} from '@prisma/client';
import { ReviewSearchObject } from 'src/types';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async product(
    productWhereUniqueInput: Prisma.productWhereUniqueInput,
  ): Promise<ProductModel | null> {
    return this.prisma.product.findUnique({
      where: productWhereUniqueInput,
      include: {
        prodimage: {
          select: {
            id: true,
            image: true,
          },
        },
        category: {
          select: {
            name: true,
            id: true,
          },
        },
        prod_reviews: {
          select: {
            id: true,
            comment: true,
            review: true,
            createdat: true,
            reactions: true,
            user: {
              select: {
                email: true,
                id: true,
                image: true,
              },
            },
          },
        },
        variant: true,
      },
    });
  }

  async Trendingproduct(): Promise<ProductModel[] | null> {
    return this.prisma.product.findMany({
      where: { activated: true },
      take: 10,
      orderBy: { createdAt: 'asc' },
      include: {
        prodimage: {
          select: {
            id: true,
            image: true,
          },
        },
      },
    });
  }

  async productCategoryHint(
    _category: string,
  ): Promise<Pick<CategoryModel, 'hint_text'>> {
    const data = await this.prisma.category.findUnique({
      where: { name: 'Vitamins' },
      select: {
        hint_text: true,
      },
    });

    return data;
  }

  async createProduct(data): Promise<ProductModel> {
    return this.prisma.$transaction(async (tx) => {
      const { image, ...rest } = data;
      const product = await tx.product.create({
        data: rest as Prisma.productCreateInput,
      });

      if (!data) {
        throw new Error('adding product failed');
      }

      await tx.prodimage.create({
        data: {
          image: image as string,
          updatedAt: null,
          product: {
            connect: { id: product.id },
          },
        },
      });

      return product;
    });
  }

  async updateProductRating(reviewId, category_id, prima) {
    // Fetch the product associated with the review
    const product = await prima.prod_reviews.findUnique({
      where: {
        reviewId: {
          id: reviewId,
          category_id: Number(category_id),
        },
      },
      select: { prod_id: true },
    });
    if (!product) {
      throw new Error('ProdReview not found'); // Clearer error message
    }

    // Calculate the average rating for the product's reviews (excluding the current review)
    const averageRating = await prima.prod_reviews.aggregate({
      where: {
        prod_id: product.prod_id,
        NOT: { id: reviewId }, // Exclude the current review
      },
      _avg: {
        review: true, // Calculate average of the 'review' field
      },
    });

    if (!averageRating) throw new Error('cant find average');
    // Update the product with the new average rating
    const Average = await prima.product.update({
      where: { id: product.prod_id },
      data: { rating: averageRating._avg.review || 0 }, // Set default to 0 if no reviews
    });
    if (!Average) throw new Error('cant update average');
    return averageRating;
  }

  async addReview(data: ReviewsModel): Promise<number> {
    return this.prisma.$transaction(async (tx) => {
      const newReview = await tx.prod_reviews.create({
        data: data,
        select: { id: true },
      });

      if (!data) {
        throw new Error('adding product failed');
      }
      if (!newReview || newReview === null) {
        throw new Error('Review creation failed'); // More specific error message
      }
      const averageRating = await this.updateProductRating(
        newReview.id,
        data.category_id,
        tx,
      );
      return averageRating;
    });
  }

  async products(params: {
    skip?: number;
    take?: number;
    cursor?: string;
    where?: Prisma.productWhereInput;
    orderBy?: Prisma.productOrderByWithRelationInput;
  }): Promise<ProductModel[]> {
    const { skip, take, cursor } = params;
    if (cursor === '') {
      return this.prisma.product.findMany({
        skip: 0,
        take,
        where: { activated: true },
        orderBy: { updatedAt: 'asc' },
        include: {
          prodimage: {
            select: {
              id: true,
              image: true,
            },
          },
          category: {
            select: {
              name: true,
            },
          },
          prod_reviews: {
            select: {
              id: true,
              comment: true,
              review: true,
            },
          },
          variant: true,
        },
      });
    } else {
      return this.prisma.product.findMany({
        skip,
        take,
        cursor: { id: cursor },
        where: { activated: true },
        orderBy: { updatedAt: 'asc' },
        include: {
          prodimage: {
            select: {
              id: true,
              image: true,
            },
          },
          category: {
            select: {
              name: true,
            },
          },
          prod_reviews: {
            select: {
              id: true,
              comment: true,
              review: true,
            },
          },
          variant: true,
        },
      });
    }
  }

  async productSearch(params: {
    skip?: number;
    take?: number;
    cursor?: string;
    where?: string;
    orderBy?: Prisma.productOrderByWithRelationInput;
  }): Promise<ProductModel[]> {
    const { skip, take, cursor, where } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      cursor: typeof cursor !== 'undefined' ? { id: cursor } : undefined,
      where: {
        OR: [
          {
            name: {
              search: where,
            },
          },
          { description: { search: where } },
        ],
      },
      orderBy: { createdAt: 'asc' },
      include: {
        prodimage: {
          select: {
            id: true,
            image: true,
          },
        },
        prod_reviews: {
          select: {
            id: true,
            comment: true,
            review: true,
          },
        },
        variant: true,
      },
    });
  }

  async productReviews(params: {
    skip?: number;
    take?: number;
    cursor?: string;
    where?: Prisma.prod_reviewsWhereInput;
    orderBy?: Prisma.prod_reviewsOrderByWithRelationInput;
    prod_id: string;
    category_id: number;
  }): Promise<prod_reviews[]> {
    const { skip, take, cursor, prod_id, category_id } = params;

    const data = await this.prisma.prod_reviews.findMany({
      skip,
      take,
      cursor:
        typeof cursor !== 'undefined'
          ? { reviewId: { id: cursor, category_id: category_id } }
          : undefined,
      where: { category_id: category_id, prod_id: prod_id },
      orderBy: { createdat: 'asc' },
      include: {
        reactions: true,
        reply: true,
        user: true,
      },
    });
    return data;
  }
  async deleteProduct(
    where: Prisma.productWhereUniqueInput,
  ): Promise<ProductModel> {
    return this.prisma.product.delete({
      where,
    });
  }

  async updateProduct(params: {
    where: Prisma.productWhereUniqueInput;
    data: Prisma.productUpdateInput;
  }): Promise<ProductModel> {
    const { where, data } = params;
    return this.prisma.product.update({
      data,
      where,
    });
  }

  async getProductReviewByUser(
    params: ReviewSearchObject,
  ): Promise<ReviewsModel | object> {
    const review = await this.prisma.prod_reviews.findUnique({
      where: {
        userReview: {
          category_id: Number(params.category_id),
          user_id: params.user_id,
          prod_id: params.prod_id,
        },
      },
      include: {
        reactions: true,
      },
    });
    return review ?? {};
  }

  async getReviewReaction(
    params: Omit<Prisma.reactionUserReactionsCompoundUniqueInput, 'id'>,
  ): Promise<reaction[]> {
    const review = await this.prisma.reaction.findMany({
      where: {
        reviewer_id: params.reviewer_id,
      },
      // reviewer_id: params.reviewer_id,
      // prod_id: params.prod_id,
      // category_id: Number(params.category_id),
    });
    return review;
  }

  async getProductReviewsSum(params: {
    id: string;
  }): Promise<ratings_stats | object> {
    const review = await this.prisma.ratings_stats.findUnique({
      where: {
        prod_id: params.id,
      },
    });
    return review ?? {};
  }

  async deleteReviewByUser(
    reviewsWhereUniqueInput: Prisma.prod_reviewsUserReviewCompoundUniqueInput,
  ): Promise<prod_reviews> {
    const review = await this.prisma.prod_reviews.delete({
      where: {
        userReview: reviewsWhereUniqueInput,
      },
    });

    return review;
  }

  async addUserReaction(params: reaction): Promise<boolean> {
    return this.prisma.$transaction(async (tx) => {
      const review = await tx.reaction.findUnique({
        where: {
          reviewerReaction: {
            reviewer_id: params.reviewer_id,
            user_id: params.user_id,
            prod_id: params.prod_id,
          },
        },
      });
      if (review && review.reation_type === params.reation_type) {
        const operation = await tx.reaction.delete({
          where: {
            reviewerReaction: {
              reviewer_id: params.reviewer_id,
              user_id: params.user_id,
              prod_id: params.prod_id,
            },
          },
        });
        return operation ? true : false;
      } else if (review && review.reation_type !== params.reation_type) {
        const operation = await tx.reaction.update({
          where: {
            reviewerReaction: {
              reviewer_id: params.reviewer_id,
              user_id: params.user_id,
              prod_id: params.prod_id,
            },
          },
          data: {
            reation_type: params.reation_type,
          },
        });
        return operation ? true : false;
      } else {
        const operation = await tx.reaction.create({ data: params });
        return operation ? true : false;
      }
    });
  }
}
