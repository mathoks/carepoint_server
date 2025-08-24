import {
  Controller,
  Query,
  Get,
  Param,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  product as ProductModel,
  Prisma,
  prod_reviews,
  ratings_stats,
  reaction,
} from '@prisma/client';
import { CacheKey } from '@nestjs/cache-manager';

@Controller('products')
// @UseInterceptors(CacheInterceptor)
@CacheKey('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  async getProducts(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('filter') filter?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: Prisma.productWhereInput,
    @Query('orderBy') orderBy?: Prisma.productOrderByWithRelationInput,
  ): Promise<ProductModel[]> {
    const data = await this.productsService.products({
      skip: Number(skip),
      take: Number(take),
      filter,
      cursor,
      where,
      orderBy,
    });

    return data;
  }

  @Get('/search') async getSearchProducts(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('cursor') cursor?: string,
    @Query('search') where?: string,
    @Query('orderBy') orderBy?: Prisma.productOrderByWithRelationInput,
  ): Promise<ProductModel[]> {
    const data = await this.productsService.productSearch({
      skip: Number(skip),
      take: Number(take),
      cursor,
      where,
      orderBy,
    });

    return data;
  }

  @Get('/trending/:category')
  async getTrendingProducts(
    @Param('category') category: string,
  ): Promise<ProductModel[]> {
    const data = await this.productsService.Trendingproduct(category);

    return data;
  }

  @Get('/hints/:category')
  async getCategoryHint(
    @Param('category') category: Pick<Prisma.categoryWhereUniqueInput, 'name'>,
  ): Promise<object> {
    const data = await this.productsService.productCategoryHint(category);
    return data;
  }

  @Get('/category/')
  async getProdByCategory(
    @Query('category') category: Pick<Prisma.categoryWhereUniqueInput, 'name'>,
  ): Promise<object> {
    const data = await this.productsService.productCategoryHint(category);
    return data;
  }
  @Get('/:id/getAllReviews')
  async getProductReviews(
    @Param('id') prod_id: string,
    @Query('skip') skip?: number,
    @Query('take') take?: number,
    @Query('cursor') cursor?: string,
    @Query('category_id') category_id?: Prisma.prod_reviewsWhereInput,
    @Query('where') where?: Prisma.prod_reviewsWhereInput,
    @Query('orderBy') orderBy?: Prisma.prod_reviewsOrderByWithRelationInput,
  ): Promise<prod_reviews[]> {
    const data = await this.productsService.productReviews({
      skip: Number(skip),
      take: Number(take),
      cursor,
      where,
      orderBy,
      prod_id,
      category_id: Number(category_id),
    });
    return data;
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string): Promise<ProductModel> {
    const data = await this.productsService.product({ id: id });
    return data;
  }

  @Get('/:id/reviews-reactions')
  async getReviewReaction(
    @Param('id') id: string,
    @Query('category_id') category_id: string,
    @Query('review_id') review_id: string,
  ): Promise<reaction[]> {
    return this.productsService.getReviewReaction({
      reviewer_id: review_id,
    });
  }

  @Post('/:id/add-reviews')
  async addReview(@Param('id') id: string, @Body() body): Promise<number> {
    return this.productsService.addReview({
      ...body.rest,
      ...{ user_id: body.user_id },
    });
  }

  @Post('/:id/add-reaction')
  async addUserReaction(
    @Param('id') id: string,
    @Body() body,
  ): Promise<boolean> {
    return this.productsService.addUserReaction({
      ...body,
      ...{ prod_id: id },
    });
  }

  @Post('/create-product')
  async createDraft(
    @Body()
    productData: {
      categoryId: number;
      name: string;
      description?: string;
      price: number;
      stockQt: number;
      image: string;
      originalPrice: number;
    },
  ): Promise<ProductModel> {
    const {
      price,
      name,
      stockQt,
      description,
      originalPrice,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      image,
      categoryId,
    } = productData;
    return this.productsService.createProduct({
      price,
      name,
      stockQt,
      description,
      originalPrice,
      category: {
        connect: { id: categoryId },
      },
    });
  }

  @Get('/:id/user-review')
  async getProductReviewByUser(
    @Param('id') id: string,
    @Query() query: { user: string; category: number },
  ): Promise<prod_reviews | object> {
    const review = await this.productsService.getProductReviewByUser({
      user_id: query.user,
      category_id: query.category,
      prod_id: id,
    });
    return review;
  }

  @Delete('/:id/remove-review')
  async deleteReview(
    @Param('id') id: string,
    @Query('category_id') category_id: number,
    @Query('user_id') user_id: string,
  ): Promise<prod_reviews> {
    return this.productsService.deleteReviewByUser({
      prod_id: id,
      user_id,
      category_id: Number(category_id),
    });
  }

  @Get('/:id/review-summary')
  async getProductReviewsSum(
    @Param('id') id: string,
  ): Promise<ratings_stats | object> {
    const data = await this.productsService.getProductReviewsSum({
      id: id,
    });
    return data;
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string): Promise<ProductModel> {
    return this.productsService.deleteProduct({ id: id });
  }
}
