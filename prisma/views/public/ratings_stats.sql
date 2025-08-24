SELECT
  pr.prod_id,
  count(pr.review) AS total_reviews,
  (avg(pr.review)) :: numeric(10, 2) AS average_rating,
  (
    (
      (
        sum(
          CASE
            WHEN (pr.review = 5) THEN 1
            ELSE 0
          END
        )
      ) :: numeric(10, 2) * 100.0
    ) / (count(pr.review)) :: numeric
  ) AS percentage_5,
  (
    (
      (
        sum(
          CASE
            WHEN (pr.review = 4) THEN 1
            ELSE 0
          END
        )
      ) :: numeric(10, 2) * 100.0
    ) / (count(pr.review)) :: numeric
  ) AS percentage_4,
  (
    (
      (
        sum(
          CASE
            WHEN (pr.review = 3) THEN 1
            ELSE 0
          END
        )
      ) :: numeric(10, 2) * 100.0
    ) / (count(pr.review)) :: numeric
  ) AS percentage_3,
  (
    (
      (
        sum(
          CASE
            WHEN (pr.review = 2) THEN 1
            ELSE 0
          END
        )
      ) :: numeric(10, 2) * 100.0
    ) / (count(pr.review)) :: numeric
  ) AS percentage_2,
  (
    (
      (
        sum(
          CASE
            WHEN (pr.review = 1) THEN 1
            ELSE 0
          END
        )
      ) :: numeric(10, 2) * 100.0
    ) / (count(pr.review)) :: numeric
  ) AS percentage_1
FROM
  prod_reviews pr
GROUP BY
  pr.prod_id;