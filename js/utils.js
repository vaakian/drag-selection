export function isOverlap(RectA, RectB) {
    // 没有一个满足那么就有重叠
    const noOverlap =
        RectB.right < RectA.left ||
        RectB.left > RectA.right ||
        RectB.bottom < RectA.top ||
        RectB.top > RectA.bottom
    return !noOverlap
}