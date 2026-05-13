#include <stdio.h>

int input_int(const char *message)
{
    char buf[32];
    int num = 0;

    printf("%sを入力: ", message);
    if (fgets(buf, sizeof(buf), stdin))
    {
        sscanf(buf, "%d", &num); // 失敗してもnumの初期値0が残る
    }

    return num;
}

// 結果が整数になる場合だけ解を出せるsqrt関数
int simple_sqrt(double value)
{
    int int_max = 2147483647;

    // 負の値と非整数を除外
    if (value < 0 || value > int_max || value - ((int)value) != 0.0)
    {
        return -1;
    }

    int root_max = 46340; // 二乗してもint_maxを超えない値

    for (size_t i = 0; i < root_max; i++)
    {
        if (i * i == (int)value)
        {
            return i;
        }
        if (i * i > (int)value)
        {
            // 解が整数にならない場合
            return -1;
        }
    }
    return -1;
}

int main(void)
{

    // ax^2 + bx + c = 0 のx の解を求める関数（解の公式）
    double a = input_int("a");
    double b = input_int("b");
    double c = input_int("c");

    printf("(%gx²) + (%gx) + (%g) = 0\n", a, b, c);

    if (a == 0 && b == 0)
    {
        printf("aとbを同時に0にはできません。\n");
        return 0;
    }
    else if (a == 0)
    {
        printf("x = %g\n", -c / b);
        return 0;
    }

    // 判別式（b^2 - 4ac）
    double discriminant = (b * b) - (4 * a * c);
    int root_discriminant = simple_sqrt(discriminant);

    if (root_discriminant == -1)
    {
        printf("x = (%g ± √(%g)) / %g\n", -b, discriminant, 2 * a);
    }
    else
    {
        double solution1 = (-b - root_discriminant) / (2 * a);
        double solution2 = (-b + root_discriminant) / (2 * a);
        if (root_discriminant == 0) // 重解。solution1と2が同じ値になる
        {
            printf("x = %g\n", solution1);
        }
        else
        {
            printf("x = %g, %g\n", solution1, solution2);
        }
    }

    return 0;
}